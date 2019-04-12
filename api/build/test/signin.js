"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireWildcard(require("chai"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

describe('Testing User Controller', function () {
  describe('Testing signin controller', function () {
    var signinUrl = '/api/auth/signin';
    it('should login when all the parameters are given', function (done) {
      _chai["default"].request(_app["default"]).post(signinUrl).send({
        email: 'banka2@banka.com',
        password: 'passworD2@'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response).to.have.status(200);
        (0, _chai.expect)(response.body.data).to.be.a('object');
        (0, _chai.expect)(response.body.data.loggedUser).to.have.property('id');
        (0, _chai.expect)(response.body.data.loggedUser).to.have.property('email');
        (0, _chai.expect)(response.body.data).to.have.property('token');
        done();
      });
    });
    it('should not signin a user when the email is missing', function (done) {
      _chai["default"].request(_app["default"]).post(signinUrl).send({
        password: 'passworD4@'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal('error');
        (0, _chai.expect)(response.body.data).to.equal('incorrect data');
        done();
      });
    });
    it('should not signin a user when the email does not exist', function (done) {
      _chai["default"].request(_app["default"]).post(signinUrl).send({
        email: 'banka5@banka.com',
        password: 'passworD4@'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal('error');
        (0, _chai.expect)(response.body.data).to.equal('incorrect data');
        done();
      });
    });
    it('should not register a user when the password is missing', function (done) {
      _chai["default"].request(_app["default"]).post(signinUrl).send({
        email: 'banka4@banka.com'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal('error');
        (0, _chai.expect)(response.body.data).to.equal('incorrect data');
        done();
      });
    });
    it('should not register a user when the password do not meet requirement', function (done) {
      _chai["default"].request(_app["default"]).post(signinUrl).send({
        email: 'banka2@banka.com',
        password: 'passworD4'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal('error');
        (0, _chai.expect)(response.body.data).to.equal('incorrect data');
        done();
      });
    });
  });
});
//# sourceMappingURL=signin.js.map