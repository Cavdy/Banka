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
          .dbConnect('SELECT id, accountnumber, createdon, owner, type, status, balance FROM accounts WHERE accountNumber=$1', [accountNumberGenerator]);
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
  patchAccount(accountNumber, accountUpdate, staff) {
    let account;

    if (staff.loggedUser.type === 'staff' || staff.loggedUser.isAdmin === true) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i <= accounts.length - 1; i++) {
        // eslint-disable-next-line eqeqeq
        if (accounts[i].accountNumber == accountNumber) {
          accounts[i].status = accountUpdate.status;
          account = accounts[i];
        }
      }
    } else {
      account = 'Sorry you don\'t have permission to perform this task';
    }
    return account;
  },
  deleteAccount(accountNumber, staff) {
    let account;

    if (staff.loggedUser.type === 'staff' || staff.loggedUser.isAdmin === true) {
      const Account = accounts.find(mAccount => mAccount.accountNumber == accountNumber);

      if (typeof Account !== 'undefined') {
        accounts.splice(Account.id - 1, 1);
        account = 'account deleted';
      } else {
        account = 'no account found or account has been deleted';
      }
    } else {
      account = 'Sorry you don\'t have permission to perform this task';
    }
    return account;
  },
};

export default CreateAccountService;
