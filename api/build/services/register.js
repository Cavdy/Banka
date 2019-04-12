"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("../dummyJson/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-param-reassign */
var users = _users["default"].users;
var RegisterService = {
  registerUser: function registerUser(userData) {
    var firstnameAndLastnameRegex = /^[a-zA-Z ]{2,15}$/;
    var emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
    var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    var returnValue = []; // eslint-disable-next-line one-var

    var emailPassed, firstnamePassed, lastnamePassed, passwordPassed;
    var usersLength = users.length;
    var newId = usersLength + 1;
    userData.id = newId; // Check if email is valid

    if (emailRegex.test(userData.email)) {
      var checkEmail = false; // check if email is exist

      for (var i = 0; i <= usersLength - 1; i++) {
        if (users[i].email === userData.email) {
          checkEmail = true;
        }
      } // gives output


      if (checkEmail) {
        returnValue.push('email already exist');
      } else {
        emailPassed = true;
      }
    } else {
      returnValue.push('Email is required');
    }

    if (firstnameAndLastnameRegex.test(userData.firstName) && typeof userData.firstName !== 'undefined' && userData.firstName !== null) {
      firstnamePassed = true;
    } else {
      returnValue.push('Firstname required');
    }

    if (firstnameAndLastnameRegex.test(userData.lastName) && typeof userData.lastName !== 'undefined' && userData.lastName !== null) {
      lastnamePassed = true;
    } else {
      returnValue.push('Lastname required');
    }

    if (passwordRegex.test(userData.password) && typeof userData.password !== 'undefined' && userData.password !== null) {
      passwordPassed = true;
    } else {
      returnValue.push('Password should contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol or character');
    } // eslint-disable-next-line max-len


    if (emailPassed === true && firstnamePassed === true && lastnamePassed === true && passwordPassed === true) {
      users.push(userData);
      returnValue = userData;
    }

    return returnValue;
  }
};
var _default = RegisterService;
exports["default"] = _default;
//# sourceMappingURL=register.js.map