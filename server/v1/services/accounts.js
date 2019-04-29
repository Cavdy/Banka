import dbConnection from '../config/database';
import AccountModel from '../model/accounts';

const CreateAccountService = {
  /**
 * Create an account.
 * @constructor
 * @param {*} accountData - The title of the book.
 * @param {*} userData - The author of the book.
 */
  async createAccount(accountData, userData) {
    let returnStatus; let returnSuccess = ''; let returnError = '';
    const ACNumberGenerator = Math.floor(Math.random() * 1000000000) + 3000000000;
    const date = new Date();
    const createdOn = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const balance = parseFloat(0.00).toFixed(2);
    const status = 'draft';

    // pulling users data from database
    const userDetails = await dbConnection
      .dbConnect('SELECT * FROM users WHERE email=$1',
        [userData.email]);
    const { firstname, lastname, id } = userDetails.rows[0];

    if (accountData.type === 'savings' || accountData.type === 'current') {
      const response = await dbConnection
        .dbConnect('INSERT into accounts(email, firstName, lastName, accountNumber, createdOn, owner, type, status, balance) values($1, $2, $3, $4, $5, $6, $7, $8, $9)',
          [userData.email, firstname, lastname, ACNumberGenerator, createdOn, id, accountData.type, status, balance]);
      if (response.command === 'INSERT') {
        const accountDbData = await dbConnection
          .dbConnect('SELECT id, accountnumber, createdon, owner, type, status, balance FROM accounts WHERE accountnumber=$1',
            [ACNumberGenerator]);
        const account = new AccountModel();
        account.id = accountDbData.rows[0].id;
        account.accountNumber = accountDbData.rows[0].accountnumber;
        account.createdOn = accountDbData.rows[0].createdon;
        account.owner = accountDbData.rows[0].owner;
        account.type = accountDbData.rows[0].type;
        account.status = accountDbData.rows[0].status;
        account.balance = accountDbData.rows[0].balance;
        returnStatus = 201;
        returnSuccess = account;
      }
    } else {
      returnStatus = 422;
      returnError = 'account type can either be savings or current';
    }

    return {
      returnStatus,
      returnSuccess,
      returnError,
    };
  },

  /**
   * Get all accounts
   * @constructor
   * @param {*} queryParams - passed in query data.
   * @param {*} queryLimit -passed query limit
   * @param {*} staff - staff details passed in
   */
  async allAccounts(queryParams, queryLimit, staff) {
    let returnStatus; let returnSuccess = ''; let returnError = '';

    // pulling users data from database
    const userDetails = await dbConnection
      .dbConnect('SELECT type, isadmin FROM users WHERE email=$1',
        [staff.email]);
    const { type, isadmin } = userDetails.rows[0];

    if (type === 'staff' || isadmin === true) {
      if (typeof queryParams !== 'undefined'
        && typeof queryLimit !== 'undefined') {
        const allAccounts = await dbConnection
          .dbConnect('SELECT * from accounts WHERE status=$1 LIMIT $2',
            [queryParams, queryLimit]);
        if (allAccounts.rows.length > 0) {
          returnStatus = 200;
          returnSuccess = allAccounts.rows;
        } else {
          returnStatus = 404;
          returnError = 'no account found';
        }
      } else if (typeof queryParams === 'undefined'
        || typeof queryLimit !== 'undefined') {
        const allAccounts = await dbConnection
          .dbConnect('SELECT * from accounts LIMIT $1', [queryLimit]);
        if (allAccounts.rows.length > 0) {
          returnStatus = 200;
          returnSuccess = allAccounts.rows;
        }
      }
    } else {
      returnStatus = 401;
      returnError = 'Sorry you don\'t have permission to perform this task';
    }

    return {
      returnStatus,
      returnSuccess,
      returnError,
    };
  },

  /**
   * Get specific account
   * @constructor
   * @param {*} accountNumber - recieve account number.
   * @param {*} loggedIn - logged in details.
   */
  async specificAccounts(accountNumber, loggedIn) {
    let returnStatus; let returnSuccess = ''; let returnError = '';

    const users = await dbConnection
      .dbConnect('SELECT * from users WHERE email=$1',
        [loggedIn.email]);
    const { type, isadmin } = users.rows[0];

    const userAccount = await dbConnection
      .dbConnect('SELECT * from accounts WHERE accountnumber=$1',
        [accountNumber]);

    if (userAccount.rows.length > 0) {
      if (userAccount.rows[0].email === loggedIn.email) {
        returnStatus = 200;
        // eslint-disable-next-line prefer-destructuring
        returnSuccess = userAccount.rows[0];
      } else if (type === 'staff' || isadmin === true) {
        returnStatus = 200;
        // eslint-disable-next-line prefer-destructuring
        returnSuccess = userAccount.rows[0];
      } else {
        returnStatus = 401;
        returnError = 'sorry you can\'t view another user\'s account';
      }
    } else {
      returnStatus = 404;
      returnError = 'no account found';
    }

    return {
      returnStatus,
      returnSuccess,
      returnError,
    };
  },

  /**
   * Get all accounts trasactions that belongs to account number
   * @constructor
   * @param {*} accountNumber - recieve account number.
   * @param {*} loggedIn - logged in details.
   */
  async allAccountTransaction(accountNumber, loggedIn) {
    let returnStatus; let returnSuccess = ''; let returnError = '';

    const users = await dbConnection
      .dbConnect('SELECT * from users WHERE email=$1',
        [loggedIn.email]);
    const { type, isadmin } = users.rows[0];

    const userTransaction = await dbConnection
      .dbConnect('SELECT * from transactions WHERE accountnumber=$1',
        [accountNumber]);

    const userAccount = await dbConnection
      .dbConnect('SELECT email from accounts WHERE accountnumber=$1',
        [accountNumber]);

    if (userTransaction.rows.length > 0) {
      if (userAccount.rows[0].email === loggedIn.email) {
        returnStatus = 200;
        // eslint-disable-next-line prefer-destructuring
        returnSuccess = userTransaction.rows;
      } else if (type === 'staff' || isadmin === true) {
        returnStatus = 200;
        // eslint-disable-next-line prefer-destructuring
        returnSuccess = userTransaction.rows;
      } else {
        returnStatus = 401;
        returnError = 'sorry you can\'t view another user\'s transactions';
      }
    } else {
      returnStatus = 404;
      returnError = 'no transaction found';
    }

    return {
      returnStatus,
      returnSuccess,
      returnError,
    };
  },

  /**
   * Patch account
   * @constructor
   * @param {*} accountNumber - recieve account number
   * @param {*} accountUpdate -data to update
   * @param {*} staff - staff details passed in
   */
  async patchAccount(accountNumber, accountUpdate, staff) {
    let returnStatus; let returnSuccess = ''; let returnError = '';

    // pulling users data from database
    const userDetails = await dbConnection
      .dbConnect('SELECT type, isadmin FROM users WHERE email=$1',
        [staff.email]);
    const { type, isadmin } = userDetails.rows[0];

    if (type === 'staff' || isadmin === true) {
      if (accountUpdate.status === 'active' || accountUpdate.status === 'dormant') {
        const accountDbData = await dbConnection
          .dbConnect('SELECT accountnumber FROM accounts WHERE accountnumber=$1',
            [accountNumber]);
        if (accountDbData.rows.length > 0) {
          const updateAccount = await dbConnection
            .dbConnect('UPDATE accounts SET status=$1 WHERE accountnumber=$2 RETURNING accountnumber, status',
              [accountUpdate.status, accountNumber]);
          if (updateAccount.command === 'UPDATE') {
            const { accountnumber, status } = updateAccount.rows[0];
            returnStatus = 200;
            returnSuccess = { accountnumber, status };
          }
        } else {
          returnStatus = 404;
          returnError = 'account not found';
        }
      } else {
        returnStatus = 422;
        returnError = 'account status can only be active or dormant';
      }
    } else {
      returnStatus = 401;
      returnError = 'Sorry you don\'t have permission to perform this task';
    }

    return {
      returnStatus,
      returnSuccess,
      returnError,
    };
  },

  /**
   * Delete account
   * @constructor
   * @param {*} accountNumber - recieve account number.
   * @param {*} staff - staff details passed in
   */
  async deleteAccount(accountNumber, staff) {
    let returnStatus; let returnSuccess = ''; let returnError = '';

    const userDetails = await dbConnection
      .dbConnect('SELECT type, isadmin FROM users WHERE email=$1',
        [staff.email]);
    const { type, isadmin } = userDetails.rows[0];

    if (type === 'staff' || isadmin === true) {
      const checkAccount = await dbConnection
        .dbConnect('SELECT accountnumber FROM accounts WHERE accountnumber=$1',
          [accountNumber]);
      if (checkAccount.rows.length > 0) {
        const accountDbData = await dbConnection
          .dbConnect('DELETE FROM accounts WHERE accountnumber=$1',
            [accountNumber]);
        if (accountDbData.command === 'DELETE') {
          await dbConnection
            .dbConnect('DELETE FROM transactions WHERE accountnumber=$1',
              [accountNumber]);
          returnStatus = 200;
          returnSuccess = 'Account successfully deleted';
        }
      } else {
        returnStatus = 404;
        returnError = 'no account found';
      }
    } else {
      returnStatus = 401;
      returnError = 'Sorry you don\'t have permission to perform this task';
    }
    return {
      returnStatus,
      returnSuccess,
      returnError,
    };
  },
};

export default CreateAccountService;
