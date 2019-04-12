"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Account = function Account() {
  _classCallCheck(this, Account);

  this.id = null;
  this.accountNumber = null;
  this.createdOn = null;
  this.owner = null; // user id

  this.type = null; // savings, current

  this.status = null; // draft, active, or dormant

  this.balance = null;
};

exports["default"] = Account;
//# sourceMappingURL=CreateAccount.js.map