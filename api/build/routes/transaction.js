"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _transaction = _interopRequireDefault(require("../controllers/transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // creating our routes


router.post('/:accountNumber/debit', _transaction["default"].debitTransaction);
router.post('/:accountNumber/credit', _transaction["default"].creditTransaction);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=transaction.js.map