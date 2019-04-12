"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _transaction = _interopRequireDefault(require("../services/transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable consistent-return */
var TransactionController = {
  debitTransaction: function debitTransaction(req, res) {
    var accountNumber = req.params.accountNumber;
    var transactionData = req.body; // verify jwt token

    _jsonwebtoken["default"].verify(req.token, '5634', function (err, authorizedData) {
      if (err) {
        res.sendStatus(403);
      } else {
        var debitedData = _transaction["default"].debitTransaction(accountNumber, authorizedData, transactionData);

        return res.json({
          status: 'success',
          data: debitedData
        }).status(201);
      }
    });
  },
  creditTransaction: function creditTransaction(req, res) {
    var accountNumber = req.params.accountNumber;
    var transactionData = req.body; // verify jwt token

    _jsonwebtoken["default"].verify(req.token, '5634', function (err, authorizedData) {
      if (err) {
        res.sendStatus(403);
      } else {
        var creditedData = _transaction["default"].creditTransaction(accountNumber, authorizedData, transactionData);

        return res.json({
          status: 'success',
          data: creditedData
        }).status(201);
      }
    });
  }
};
var _default = TransactionController;
exports["default"] = _default;
//# sourceMappingURL=transaction.js.map