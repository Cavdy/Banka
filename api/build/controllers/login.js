"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _login = _interopRequireDefault(require("../services/login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var LoginController = {
  loginUser: function loginUser(req, res) {
    var userData = req.body;

    var loggedUser = _login["default"].loginUser(userData);

    return _jsonwebtoken["default"].sign({
      loggedUser: loggedUser
    }, '5634', function (err, token) {
      if (err) {
        console.log(err);
      }

      if (loggedUser[0] === 'Invalid format' || loggedUser[0] === 'incorrect credentials') {
        res.json({
          status: 'error',
          data: 'incorrect data'
        });
      } else {
        res.json({
          status: 'success',
          data: {
            loggedUser: loggedUser,
            token: token
          }
        }).status(201);
      }
    });
  }
};
var _default = LoginController;
exports["default"] = _default;
//# sourceMappingURL=login.js.map