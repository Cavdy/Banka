"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("../../dummyJson/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var users = _users["default"].users;
var LoginService = {
  loginUser: function loginUser(userData) {
    var emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
    var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    var returnValue = []; // Check if email and password is valid

    if (emailRegex.test(userData.email) && passwordRegex.test(userData.password)) {
      var checkDetails = false; // check if account exist
      // eslint-disable-next-line no-plusplus

      for (var i = 0; i <= users.length - 1; i++) {
        if (users[i].email === userData.email && users[i].password === userData.password) {
          returnValue = users[i];
          checkDetails = true;
        }
      } // gives output


      if (!checkDetails) {
        returnValue.push('incorrect credentials');
      }
    } else {
      returnValue.push('Invalid format');
    }

    return returnValue;
  }
};
var _default = LoginService;
exports["default"] = _default;
//# sourceMappingURL=login.js.map