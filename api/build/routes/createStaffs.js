"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _createStaffs = _interopRequireDefault(require("../controllers/createStaffs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // creating our routes


router.post('/', _createStaffs["default"].createStaff);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=createStaffs.js.map