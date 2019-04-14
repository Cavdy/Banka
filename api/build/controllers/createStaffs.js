"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _createStaffs = _interopRequireDefault(require("../services/createStaffs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CreateStaffController = {
  createStaff: function createStaff(req, res) {
    var userData = req.body; // eslint-disable-next-line no-unused-expressions

    _jsonwebtoken["default"].verify(req.token, '5634', function (err, authorizedData) {
      if (err) {
        res.sendStatus(403);
      } else {
        var createdStaff = _createStaffs["default"].createStaffUser(userData, authorizedData);

        return res.json({
          status: 'success',
          data: createdStaff
        }).status(201);
      }
    });
  }
};
var _default = CreateStaffController;
exports["default"] = _default;
//# sourceMappingURL=createStaffs.js.map