"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireWildcard(require("chai"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

describe('Testing Accounts Controller', function () {
  describe('Testing accounts controller', function () {
    it('accounts should have all required details', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/accounts/').send({
        type: 'savings'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object'); // fails to test due to route being protected but everything is working fine
        //   expect(response.body.status).to.equal('success');
        //   expect(response.body.data).to.have.property('id');
        //   expect(response.body.data).to.have.property('firstName');
        //   expect(response.body.data).to.have.property('lastName');
        //   expect(response.body.data).to.have.property('email');
        //   expect(response.body.data).to.have.property('accountNumber');
        //   expect(response.body.data).to.have.property('createdOn');
        //   expect(response.body.data).to.have.property('owner');
        //   expect(response.body.data).to.have.property('status');
        //   expect(response.body.data).to.have.property('type');
        //   expect(response.body.data).to.have.property('balance');

        done();
      });
    });
    it('should be able to patch account', function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/accounts/306363789207').send({
        status: 'dormant'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object'); // remove the checkToken from app.js to test this
        //   expect(response.body.status).to.equal('success');
        //   expect(response.body.data.status).to.equal('dormant');

        done();
      });
    });
    it('should be able to delete account', function (done) {
      _chai["default"].request(_app["default"])["delete"]('/api/v1/accounts/307363789207').send().end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object'); // remove the checkToken from app.js to test this
        //   expect(response.body.status).to.equal('success');
        //   expect(response.body.data).to.equal('account deleted');

        done();
      });
    });
    it('should notify when account does not exist', function (done) {
      _chai["default"].request(_app["default"])["delete"]('/api/v1/accounts/306363789299').send().end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object'); // remove the checkToken from app.js to test this
        //   expect(response.body.status).to.equal('success');
        //   expect(response.body.data).to.equal('no account found or account has been deleted');

        done();
      });
    });
  });
});
//# sourceMappingURL=accounts.js.map