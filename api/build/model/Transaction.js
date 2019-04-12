"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transaction = function Transaction() {
  _classCallCheck(this, Transaction);

  this.id = null;
  this.createdOn = null;
  this.type = null; // credit or debit

  this.accountNumber = null;
  this.cashier = null; // cashier id

  this.amount = null;
  this.oldBalance = null;
  this.newBalance = null;
};

exports["default"] = Transaction;
//# sourceMappingURL=Transaction.js.map