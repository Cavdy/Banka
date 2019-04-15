/* eslint-disable no-param-reassign */
import transactionsData from '../../dummyJson/transactions';
import accountsData from '../../dummyJson/accounts';

const { accounts } = accountsData;

const { transactions } = transactionsData;

const TransactionService = {
  debitTransaction(accountNumber, loggedInUser, transactionData) {
    if (loggedInUser.loggedUser.type === 'staff' || loggedInUser.loggedUser.isAdmin === true) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i <= accounts.length - 1; i++) {
        // eslint-disable-next-line eqeqeq
        if (accounts[i].accountNumber == accountNumber) {
          const date = new Date();
          const createdOn = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
          const transactionLength = transactions.length;
          const newId = transactionLength + 1;
          transactionData.id = newId;
          transactionData.createdOn = createdOn;
          transactionData.type = 'debit';
          transactionData.accountNumber = accountNumber;
          transactionData.cashier = loggedInUser.loggedUser.id;
          transactionData.amount = transactionData.amount;
          transactionData.oldBalance = accounts[i].balance;
          const newBalance = accounts[i].balance - transactionData.amount;
          transactionData.newBalance = newBalance;
          transactions.push(transactionData);
          return transactionData;
        }
      }
    }
    return 'you must be a staff to perform this transaction';
  },
  creditTransaction(accountNumber, loggedInUser, transactionData) {
    if (loggedInUser.loggedUser.type === 'staff' || loggedInUser.loggedUser.isAdmin === true) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i <= accounts.length - 1; i++) {
        // eslint-disable-next-line eqeqeq
        if (accounts[i].accountNumber == accountNumber) {
          const date = new Date();
          const createdOn = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
          const transactionLength = transactions.length;
          const newId = transactionLength + 1;
          transactionData.id = newId;
          transactionData.createdOn = createdOn;
          transactionData.type = 'credit';
          transactionData.accountNumber = accountNumber;
          transactionData.cashier = loggedInUser.loggedUser.id;
          transactionData.amount = transactionData.amount;
          transactionData.oldBalance = accounts[i].balance;
          const newBalance = accounts[i].balance + transactionData.amount;
          transactionData.newBalance = newBalance;
          transactions.push(transactionData);
          return transactionData;
        }
      }
    }
    return 'you must be a staff to perform this transaction';
  },
};

export default TransactionService;
