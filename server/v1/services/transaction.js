/* eslint-disable no-param-reassign */
import dbConnection from '../config/database';
import TransactionModel from '../model/transaction';
import sendEmail from '../config/mailer';

const TransactionService = {

  /**
   * Debit Transaction
   * @constructor
   * @param {*} accountNumber - account number.
   * @param {*} loggedInUser - logged in user
   * @param {*} transactionData - transaction data
   */
  async debitTransaction(accountNumber, loggedInUser, transactionData) {
    let returnStatus; let returnSuccess = ''; let returnError = '';

    // check the users table
    const userDetails = await dbConnection
      .dbConnect('SELECT id, type, isadmin FROM users WHERE email=$1',
        [loggedInUser.email]);
    const { id, type, isadmin } = userDetails.rows[0];

    // checks if logged in user is an admin or staff
    if (type === 'staff' || isadmin === true) {
      const date = new Date();
      const createdOn = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

      // pull accountnumber details from database
      const accountDbData = await dbConnection
        .dbConnect(
          'SELECT accountnumber, balance, email, lastname, status FROM accounts WHERE accountnumber=$1',
          [accountNumber]
        );
      const { accountnumber, balance, email, lastname, status } = accountDbData.rows[0];

      if (status === 'active') {
        if (/^[0-9]{1,}$/.test(transactionData.amount)) {
          // substract the passed in amount from the current balance
          const newBalance = Number.parseFloat(balance) - Number.parseFloat(transactionData.amount);
  
          // check if account balance is zero
          if (newBalance < 0) {
            returnStatus = 422;
            returnError = 'Sorry this account is very low and can\'t be debited';
          } else {
            const transactionDbData = await dbConnection
              .dbConnect('INSERT into transactions(createdon, type, accountNumber, cashier, amount, oldbalance, newbalance) values($1, $2, $3, $4, $5,$6, $7) RETURNING id, accountnumber, amount, cashier, type',
                [createdOn, 'debit', accountnumber, id, transactionData.amount, balance, newBalance]);
            if (transactionDbData.command === 'INSERT') {
              // update the account table
              const acBalance = await dbConnection
                .dbConnect(
                  'UPDATE accounts SET balance=$1 WHERE accountnumber=$2 RETURNING balance',
                  [newBalance, accountNumber]
                );
              const transaction = new TransactionModel();
              transaction.transactionId = transactionDbData.rows[0].id;
              transaction.accountNumber = transactionDbData.rows[0].accountnumber;
              transaction.amount = transactionDbData.rows[0].amount;
              transaction.cashier = transactionDbData.rows[0].cashier;
              transaction.transactionType = transactionDbData.rows[0].type;
              transaction.accountBalance = acBalance.rows[0].balance;
  
              const html = `Hi ${lastname},
                <br /><br />
                Your account has been debited ${transactionData.amount}
                <br /><br />
                Your previous balance was ${balance}
                <br /><br />
                Your new balance is ${newBalance}
                <br /><br />
                Thank You.
              `;
  
              await sendEmail
                .sendEmail('do_not_reply@banka.com',
                  email, 'Banka - Debit Alert', html);
  
              returnStatus = 201;
              returnSuccess = transaction;
            }
          }
        } else {
          returnStatus = 422;
          returnError = 'please numbers only';
        }
      } else {
        returnStatus = 401;
        returnError = 'Sorry can not debit an inactive account';
      }
    } else {
      returnStatus = 401;
      returnError = 'You must be a staff or admin to perform this transaction';
    }
    return {
      returnStatus,
      returnSuccess,
      returnError,
    };
  },

  /**
   * Get all transaction
   * @constructor
   * @param {*} authorized - checks who's logged in.
   * @param {*} limit - query limit.
   */
  async getAllTransactions(authorized, limit) {
    let returnStatus; let returnSuccess = ''; let returnError = '';

    // check the users table
    const userDetails = await dbConnection
      .dbConnect('SELECT type, isadmin FROM users WHERE email=$1',
        [authorized.email]);
    const { type, isadmin } = userDetails.rows[0];

    if (type === 'staff' || isadmin === true) {

      if (typeof limit !== 'undefined') {
        const userTransaction = await dbConnection
          .dbConnect('SELECT * from transactions LIMIT $1', [limit]);
        
        if (userTransaction.rows.length > 0) {
          returnStatus = 200;
          returnSuccess = userTransaction.rows;
        } else {
          returnStatus = 404;
          returnError = 'no transaction found';
        }
      } else {
        const userTransaction = await dbConnection
          .dbConnect('SELECT * from transactions LIMIT $1', [5]);

        if (userTransaction.rows.length > 0) {
          returnStatus = 200;
          returnSuccess = userTransaction.rows;
        } else {
          returnStatus = 404;
          returnError = 'no transaction found';
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
   * Get specific transaction
   * @constructor
   * @param {*} transactionId - transaction id.
   */
  async getSpecificTransaction(transactionId) {
    let returnStatus; let returnSuccess = ''; let returnError = '';
    const userTransaction = await dbConnection
      .dbConnect('SELECT * from transactions WHERE id=$1', [transactionId]);
    if (userTransaction.rows.length > 0) {
      returnStatus = 200;
      returnSuccess = userTransaction.rows;
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
   * Credit Transaction
   * @constructor
   * @param {*} accountNumber - account number.
   * @param {*} loggedInUser - logged in user
   * @param {*} transactionData - transaction data
   */
  async creditTransaction(accountNumber, loggedInUser, transactionData) {
    let returnStatus; let returnSuccess = ''; let returnError = '';

    // check the users table
    const userDetails = await dbConnection
      .dbConnect('SELECT id, type, isadmin FROM users WHERE email=$1',
        [loggedInUser.email]);
    const { id, type, isadmin } = userDetails.rows[0];

    // checks if logged in user is an admin or staff
    if (type === 'staff' || isadmin === true) {
      const date = new Date();
      const createdOn = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

      // pull accountnumber details from database
      const accountDbData = await dbConnection
        .dbConnect(
          'SELECT accountnumber, balance, email, lastname FROM accounts WHERE accountnumber=$1',
          [accountNumber]
        );
      const { accountnumber, balance, email, lastname } = accountDbData.rows[0];

      if (/^[0-9]{1,}$/.test(transactionData.amount)) {
        // add the passed in amount from the current balance
        const newBalance = Number.parseFloat(balance) + Number.parseFloat(transactionData.amount);
        const transactionDbData = await dbConnection
          .dbConnect('INSERT into transactions(createdon, type, accountNumber, cashier, amount, oldbalance, newbalance) values($1, $2, $3, $4, $5,$6, $7) RETURNING id, accountnumber, amount, cashier, type',
            [createdOn, 'credit', accountnumber, id, transactionData.amount, balance, newBalance]);
        if (transactionDbData.command === 'INSERT') {
          // update the account table
          const acBalance = await dbConnection
            .dbConnect('UPDATE accounts SET balance=$1 WHERE accountnumber=$2 RETURNING balance',
              [newBalance, accountNumber]);
          const transaction = new TransactionModel();
          transaction.transactionId = transactionDbData.rows[0].id;
          transaction.accountNumber = transactionDbData.rows[0].accountnumber;
          transaction.amount = transactionDbData.rows[0].amount;
          transaction.cashier = transactionDbData.rows[0].cashier;
          transaction.transactionType = transactionDbData.rows[0].type;
          transaction.accountBalance = acBalance.rows[0].balance;

          const html = `Hi ${lastname},
              <br /><br />
              Your account has been credited ${transactionData.amount}
              <br /><br />
              Your previous balance was ${balance}
              <br /><br />
              Your new balance is ${newBalance}
              <br /><br />
              Thank You.
            `;

          await sendEmail
            .sendEmail('do_not_reply@banka.com',
              email, 'Banka - Credit Alert', html);

          returnStatus = 201;
          returnSuccess = transaction;
        }
      } else {
        returnStatus = 422;
        returnError = 'please numbers only';
      }
    } else {
      returnStatus = 401;
      returnError = 'You must be a staff or admin to perform this transaction';
    }
    return {
      returnStatus,
      returnSuccess,
      returnError,
    };
  },
};

export default TransactionService;
