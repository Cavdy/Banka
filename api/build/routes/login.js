"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _login = _interopRequireDefault(require("../controllers/login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // creating our routes


router.post('/', _login["default"].loginUser);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=login.js.map