"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _accounts = _interopRequireDefault(require("../dummyJson/accounts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-param-reassign */
var accounts = _accounts["default"].accounts;
var CreateAccountService = {
  createAccount: function createAccount(accountData, userData) {
    var accountsLength = accounts.length;
    var newId = accountsLength + 1;
    var accountNumberGenerator = Math.floor(Math.random() * 1000000000) + 3000000000;
    var date = new Date();
    var createdOn = "".concat(date.getDate(), "/").concat(date.getMonth() + 1, "/").concat(date.getFullYear());
    var owner = userData.loggedUser.id;
    var firstName = userData.loggedUser.firstName;
    var lastName = userData.loggedUser.lastName;
    var email = userData.loggedUser.email;
    var balance = 0.00;
    var status = 'active'; // assign data

    accountData.id = newId;
    accountData.firstName = firstName;
    accountData.lastName = lastName;
    accountData.email = email;
    accountData.accountNumber = accountNumberGenerator;
    accountData.createdOn = createdOn;
    accountData.owner = owner;
    accountData.status = status;
    accountData.balance = balance;
    accounts.push(accountData);
    return accountData;
  },
  patchAccount: function patchAccount(accountNumber, accountUpdate) {
    var account; // eslint-disable-next-line no-plusplus

    for (var i = 0; i <= accounts.length - 1; i++) {
      // eslint-disable-next-line eqeqeq
      if (accounts[i].accountNumber == accountNumber) {
        accounts[i].status = accountUpdate.status;
        account = accounts[i];
      }
    }

    return account;
  },
  deleteAccount: function deleteAccount(accountNumber) {
    var account; // eslint-disable-next-line no-plusplus

    for (var i = 0; i <= accounts.length - 1; i++) {
      // eslint-disable-next-line eqeqeq
      if (accounts[i].accountNumber == accountNumber) {
        accounts.splice(i, 1);
        account = 'account deleted';
      } else {
        account = 'no account found or account has been deleted';
      }
    }

    return account;
  }
};
var _default = CreateAccountService;
exports["default"] = _default;
//# sourceMappingURL=createAccount.js.map