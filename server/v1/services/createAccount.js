/* eslint-disable no-param-reassign */
import dbConnection from '../config/database';
import AccountModel from '../model/CreateAccount';

const CreateAccountService = {
  async createAccount(accountData, userData) {
    const accountNumberGenerator = Math.floor(Math.random() * 1000000000) + 3000000000;
    const date = new Date();
    const createdOn = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const balance = 0.00;
    const status = 'active';
    let accountOutput;

    // pulling users data from database
    const userDetails = await dbConnection
      .dbConnect('SELECT id,firstname,lastname FROM users WHERE email=$1', [userData.email]);
    const { firstname, lastname, id } = userDetails.rows[0];

    // eslint-disable-next-line max-len
    if (accountData.type === 'savings' || accountData.type === 'current') {
      const response = await dbConnection
        .dbConnect('INSERT into accounts(email, firstName, lastName, accountNumber, createdOn, owner, type, status, balance) values($1, $2, $3, $4, $5, $6, $7, $8, $9)',
          [userData.email, firstname, lastname, accountNumberGenerator, createdOn, id, accountData.type, status, balance]);
      if (response.command === 'INSERT') {
        const accountDbData = await dbConnection
          .dbConnect('SELECT id, accountnumber, createdon, owner, type, status, balance FROM accounts WHERE accountnumber=$1', [accountNumberGenerator]);
        const account = new AccountModel();
        account.id = accountDbData.rows[0].id;
        account.accountNumber = accountDbData.rows[0].accountnumber;
        account.createdOn = accountDbData.rows[0].createdon;
        account.owner = accountDbData.rows[0].owner;
        account.type = accountDbData.rows[0].type;
        account.status = accountDbData.rows[0].status;
        account.balance = accountDbData.rows[0].balance;
        accountOutput = account;
      }
    } else {
      accountOutput = 'account type can either be savings or current';
    }

    return accountOutput;
  },

  async allAccountTransaction(accountNumber) {
    const userTransaction = await dbConnection
      .dbConnect('SELECT * from transactions WHERE accountnumber=$1', [accountNumber]);
    if (userTransaction.rows.length > 0) {
      return userTransaction.rows;
    }
    return 'no transaction found';
  },

  async patchAccount(accountNumber, accountUpdate, staff) {
    let account;

    // pulling users data from database
    const userDetails = await dbConnection
      .dbConnect('SELECT type, isadmin FROM users WHERE email=$1', [staff.email]);
    const { type, isadmin } = userDetails.rows[0];

    if (type === 'staff' || isadmin === true) {
      // eslint-disable-next-line no-plusplus
      const accountDbData = await dbConnection
        .dbConnect('SELECT accountnumber FROM accounts WHERE accountnumber=$1', [accountNumber]);
      if (accountDbData.rows.length > 0) {
        const updateAccount = await dbConnection
          .dbConnect('UPDATE accounts SET status=$1 WHERE accountnumber=$2', [accountUpdate.status, accountNumber]);
        if (updateAccount.command === 'UPDATE') {
          const userDbData = await dbConnection.dbConnect('SELECT accountnumber, status FROM accounts WHERE accountnumber=$1', [accountNumber]);
          const { accountnumber, status } = userDbData.rows[0];
          account = { accountnumber, status };
        } else {
          account = 'Something wrong happened';
        }
      }
    } else {
      account = 'Sorry you don\'t have permission to perform this task';
    }
    return account;
  },

  async deleteAccount(accountNumber, staff) {
    let account;

    const userDetails = await dbConnection
      .dbConnect('SELECT type, isadmin FROM users WHERE email=$1', [staff.email]);
    const { type, isadmin } = userDetails.rows[0];

    if (type === 'staff' || isadmin === true) {
      const checkAccount = await dbConnection
        .dbConnect('SELECT accountnumber FROM accounts WHERE accountnumber=$1', [accountNumber]);
      if (checkAccount.rows.length > 0) {
        const accountDbData = await dbConnection
          .dbConnect('DELETE FROM accounts WHERE accountnumber=$1', [accountNumber]);
        if (accountDbData.command === 'DELETE') account = 'Account successfully deleted';
      } else {
        account = 'no account found';
      }
    } else {
      account = 'Sorry you don\'t have permission to perform this task';
    }
    return account;
  },
};

export default CreateAccountService;
