/* eslint-disable no-param-reassign */
import dbConnection from '../config/database';
import TransactionModel from '../model/Transaction';

const TransactionService = {
  async debitTransaction(accountNumber, loggedInUser, transactionData) {
    let returnData;

    // check the users table
    const userDetails = await dbConnection
      .dbConnect('SELECT id, type, isadmin FROM users WHERE email=$1', [loggedInUser.email]);
    const { id, type, isadmin } = userDetails.rows[0];

    // checks if logged in user is an admin or staff
    if (type === 'staff' || isadmin === true) {
      const date = new Date();
      const createdOn = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

      // pull accountnumber details from database
      const accountDbData = await dbConnection
        .dbConnect('SELECT accountnumber, balance FROM accounts WHERE accountnumber=$1', [accountNumber]);
      const { accountnumber, balance } = accountDbData.rows[0];

      // check if a string
      const checkForDigit = /^-?\d+\.?\d*$/;
      if (checkForDigit.test(transactionData.amount)) {
        // substract the passed in amount from the current balance
        const newBalance = balance - transactionData.amount;
        const transactionDbData = await dbConnection
          .dbConnect('INSERT into transactions(createdon, type, accountNumber, cashier, amount, oldbalance, newbalance) values($1, $2, $3, $4, $5,$6, $7)',
            [createdOn, 'debit', accountnumber, id, transactionData.amount, balance, newBalance]);
        if (transactionDbData.command === 'INSERT') {
          // get the data from transaction
          const accountData = await dbConnection.dbConnect('SELECT * FROM transactions WHERE accountnumber=$1', [accountNumber]);
          // update the account table
          await dbConnection.dbConnect('UPDATE accounts SET balance=$1 WHERE accountnumber=$2', [newBalance, accountNumber]);
          const transaction = new TransactionModel();
          transaction.transactionId = accountData.rows[0].id;
          transaction.accountNumber = accountData.rows[0].accountnumber;
          transaction.amount = accountData.rows[0].amount;
          transaction.cashier = accountData.rows[0].cashier;
          transaction.transactionType = accountData.rows[0].type;
          transaction.accountBalance = accountData.rows[0].newbalance;
          returnData = transaction;
        } else {
          returnData = 'Something wrong happened';
        }
      }
    } else {
      returnData = 'You must be a staff or admin to perform this transaction';
    }
    return returnData;
  },

  async getSpecificTransaction(transactionId) {
    const userTransaction = await dbConnection
      .dbConnect('SELECT * from transactions WHERE id=$1', [transactionId]);
    if (userTransaction.rows.length > 0) {
      return userTransaction.rows;
    }
    return 'no transaction found';
  },

  async creditTransaction(accountNumber, loggedInUser, transactionData) {
    let returnData;

    // check the users table
    const userDetails = await dbConnection
      .dbConnect('SELECT id, type, isadmin FROM users WHERE email=$1', [loggedInUser.email]);
    const { id, type, isadmin } = userDetails.rows[0];

    // checks if logged in user is an admin or staff
    if (type === 'staff' || isadmin === true) {
      const date = new Date();
      const createdOn = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

      // pull accountnumber details from database
      const accountDbData = await dbConnection
        .dbConnect('SELECT accountnumber, balance FROM accounts WHERE accountnumber=$1', [accountNumber]);
      const { accountnumber, balance } = accountDbData.rows[0];

      // check if a string
      const checkForDigit = /^-?\d+\.?\d*$/;
      if (checkForDigit.test(transactionData.amount)) {
        // adding the passed in amount from the current balance
        const newBalance = balance + transactionData.amount;
        const transactionDbData = await dbConnection
          .dbConnect('INSERT into transactions(createdon, type, accountNumber, cashier, amount, oldbalance, newbalance) values($1, $2, $3, $4, $5,$6, $7)',
            [createdOn, 'credit', accountnumber, id, transactionData.amount, balance, newBalance]);
        if (transactionDbData.command === 'INSERT') {
          // get the data from transaction
          const accountData = await dbConnection.dbConnect('SELECT * FROM transactions WHERE accountnumber=$1', [accountNumber]);
          // update the account table
          await dbConnection.dbConnect('UPDATE accounts SET balance=$1 WHERE accountnumber=$2', [newBalance, accountNumber]);
          const transaction = new TransactionModel();
          transaction.transactionId = accountData.rows[0].id;
          transaction.accountNumber = accountData.rows[0].accountnumber;
          transaction.amount = accountData.rows[0].amount;
          transaction.cashier = accountData.rows[0].cashier;
          transaction.transactionType = accountData.rows[0].type;
          transaction.accountBalance = accountData.rows[0].newbalance;
          returnData = transaction;
        } else {
          returnData = 'Something wrong happened';
        }
      }
    } else {
      returnData = 'You must be a staff or admin to perform this transaction';
    }
    return returnData;
  },
};

export default TransactionService;
