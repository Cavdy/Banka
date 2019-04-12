"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _register = _interopRequireDefault(require("../controllers/register"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // creating our routes


router.post('/', _register["default"].registerUser);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=register.js.map