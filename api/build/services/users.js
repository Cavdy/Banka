"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("../dummyJson/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var users = _users["default"].users;
var UsersServices = {
  getAllUsers: function getAllUsers(staff) {
    if (staff.loggedUser.type === 'staff' || staff.loggedUser.isAdmin === true) {
      return users.map(function (user) {
        return user;
      });
    }

    return 'You don\'t have permission to view this page';
  },
  deleteUser: function deleteUser(id, staff) {
    var deleteMsg;

    if (staff.loggedUser.type === 'staff') {
      var User = users.find(function (user) {
        return user.id == id && user.type != 'staff';
      });

      if (typeof User === 'undefined') {
        deleteMsg = 'Sorry you can not delete a staff';
      } else {
        users.splice(User.id - 1, 1);
        deleteMsg = 'deleted';
      }
    } else if (staff.loggedUser.isAdmin === true) {
      var _User = users.find(function (user) {
        return user.id == id;
      });

      users.splice(_User.id - 1, 1);
    } else {
      deleteMsg = 'You don\'t have permission to do this task';
    }

    return deleteMsg;
  }
};
var _default = UsersServices;
exports["default"] = _default;
//# sourceMappingURL=users.js.map