"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _createAccount = _interopRequireDefault(require("../controllers/createAccount"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // creating our routes


router.post('/', _createAccount["default"].createAccount);
router.patch('/:accountNumber', _createAccount["default"].patchAccount);
router["delete"]('/:accountNumber', _createAccount["default"].deleteAccount);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=createAccount.js.map