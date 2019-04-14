"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _transactions = _interopRequireDefault(require("../../dummyJson/transactions"));

var _accounts = _interopRequireDefault(require("../../dummyJson/accounts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-param-reassign */
var accounts = _accounts["default"].accounts;
var transactions = _transactions["default"].transactions;
var TransactionService = {
  debitTransaction: function debitTransaction(accountNumber, loggedInUser, transactionData) {
    if (loggedInUser.loggedUser.type === 'staff') {
      // eslint-disable-next-line no-plusplus
      for (var i = 0; i <= accounts.length - 1; i++) {
        // eslint-disable-next-line eqeqeq
        if (accounts[i].accountNumber == accountNumber) {
          var date = new Date();
          var createdOn = "".concat(date.getDate(), "/").concat(date.getMonth() + 1, "/").concat(date.getFullYear());
          var transactionLength = transactions.length;
          var newId = transactionLength + 1;
          transactionData.id = newId;
          transactionData.createdOn = createdOn;
          transactionData.type = 'debit';
          transactionData.accountNumber = accountNumber;
          transactionData.cashier = loggedInUser.loggedUser.id;
          transactionData.amount = transactionData.amount;
          transactionData.oldBalance = accounts[i].balance;
          var newBalance = accounts[i].balance - transactionData.amount;
          transactionData.newBalance = newBalance;
          transactions.push(transactionData);
          return transactionData;
        }
      }
    }

    return 'you must be a staff to perform this transaction';
  },
  creditTransaction: function creditTransaction(accountNumber, loggedInUser, transactionData) {
    if (loggedInUser.loggedUser.type === 'staff') {
      // eslint-disable-next-line no-plusplus
      for (var i = 0; i <= accounts.length - 1; i++) {
        // eslint-disable-next-line eqeqeq
        if (accounts[i].accountNumber == accountNumber) {
          var date = new Date();
          var createdOn = "".concat(date.getDate(), "/").concat(date.getMonth() + 1, "/").concat(date.getFullYear());
          var transactionLength = transactions.length;
          var newId = transactionLength + 1;
          transactionData.id = newId;
          transactionData.createdOn = createdOn;
          transactionData.type = 'credit';
          transactionData.accountNumber = accountNumber;
          transactionData.cashier = loggedInUser.loggedUser.id;
          transactionData.amount = transactionData.amount;
          transactionData.oldBalance = accounts[i].balance;
          var newBalance = accounts[i].balance + transactionData.amount;
          transactionData.newBalance = newBalance;
          transactions.push(transactionData);
          return transactionData;
        }
      }
    }

    return 'you must be a staff to perform this transaction';
  }
};
var _default = TransactionService;
exports["default"] = _default;
//# sourceMappingURL=transaction.js.map