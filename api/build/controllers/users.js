"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _users = _interopRequireDefault(require("../services/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UsersController = {
  getAllUsers: function getAllUsers(req, res) {
    // verify jwt token
    _jsonwebtoken["default"].verify(req.token, '5634', function (err, authorizedData) {
      if (err) {
        res.sendStatus(403);
      } else {
        var allUsers = _users["default"].getAllUsers(authorizedData);

        return res.json({
          status: 'success',
          data: allUsers
        }).status(201);
      }
    });
  },
  deleteUser: function deleteUser(req, res) {
    var id = req.params.id; // verify jwt token

    _jsonwebtoken["default"].verify(req.token, '5634', function (err, authorizedData) {
      if (err) {
        res.sendStatus(403);
      } else {
        var deleteUser = _users["default"].deleteUser(id, authorizedData);

        return res.json({
          status: 'success',
          data: deleteUser
        }).status(201);
      }
    });
  }
};
var _default = UsersController;
exports["default"] = _default;
//# sourceMappingURL=users.js.map