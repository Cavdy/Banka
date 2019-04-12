"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _register = _interopRequireDefault(require("../services/register"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RegisterController = {
  registerUser: function registerUser(req, res) {
    var userData = req.body;

    var createdUser = _register["default"].registerUser(userData);

    return res.json({
      status: 'success',
      data: createdUser
    }).status(201);
  }
};
var _default = RegisterController;
exports["default"] = _default;
//# sourceMappingURL=register.js.map