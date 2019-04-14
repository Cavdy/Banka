"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("../dummyJson/users"));

var _registrationHelper = _interopRequireDefault(require("../helper/registrationHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-param-reassign */
var users = _users["default"].users;
var CreateStaffService = {
  createStaffUser: function createStaffUser(userData, admin) {
    var returnData = _registrationHelper["default"].registrationHelper(users, userData);

    var returnValue; // eslint-disable-next-line max-len

    if (returnData[0] === true && returnData[1] === true && returnData[2] === true && returnData[3] === true) {
      if (admin.loggedUser.isAdmin === true) {
        userData.type = 'staff';
        userData.isAdmin = false;
        users.push(userData);
        returnValue = userData;
      } else {
        returnValue = 'You must be an admin to create staffs';
      }
    } else {
      // eslint-disable-next-line prefer-destructuring
      returnValue = returnData[4];
    }

    return returnValue;
  }
};
var _default = CreateStaffService;
exports["default"] = _default;
//# sourceMappingURL=createStaffs.js.map