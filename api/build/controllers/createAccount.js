"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _createAccount = _interopRequireDefault(require("../services/createAccount"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CreateAccountController = {
  createAccount: function createAccount(req, res) {
    var accountData = req.body; // verify jwt token

    _jsonwebtoken["default"].verify(req.token, '5634', function (err, authorizedData) {
      if (err) {
        res.sendStatus(403);
      } else {
        var createdAccount = _createAccount["default"].createAccount(accountData, authorizedData);

        return res.json({
          status: 'success',
          data: createdAccount
        }).status(201);
      }
    });
  },
  // patchAccount
  patchAccount: function patchAccount(req, res) {
    var accountNumber = req.params.accountNumber;
    var accountStatus = req.body;

    var updatedAccount = _createAccount["default"].patchAccount(accountNumber, accountStatus);

    return res.json({
      status: 'success',
      data: updatedAccount
    }).status(201);
  },
  // deleteAccount
  deleteAccount: function deleteAccount(req, res) {
    var accountNumber = req.params.accountNumber;

    var deleteAccount = _createAccount["default"].deleteAccount(accountNumber);

    return res.json({
      status: 'success',
      data: deleteAccount
    }).status(200);
  }
};
var _default = CreateAccountController;
exports["default"] = _default;
//# sourceMappingURL=createAccount.js.map