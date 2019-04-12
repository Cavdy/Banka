"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User() {
  _classCallCheck(this, User);

  this.id = null;
  this.email = null;
  this.firstName = null;
  this.lastName = null;
  this.password = null;
  this.type = null; // client or staff

  this.isAdmin = null; // must be a staff user account
};

exports["default"] = User;
//# sourceMappingURL=users.js.map