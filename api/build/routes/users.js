"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controllers/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // creating our routes


router.get('/', _users["default"].getAllUsers);
router["delete"]('/:id', _users["default"].deleteUser);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=users.js.map