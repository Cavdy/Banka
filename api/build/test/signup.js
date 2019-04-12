"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireWildcard(require("chai"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

describe('Testing User Controller', function () {
  describe('Testing signup controller', function () {
    var signupUrl = '/api/auth/signup';
    it('should register a new user when all the parameters are given', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        firstName: 'cavdy',
        lastName: 'isaiah',
        email: 'banka4@banka4.com',
        password: 'passworD4@'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response).to.have.status(200);
        (0, _chai.expect)(response.body.data).to.be.a('object');
        (0, _chai.expect)(response.body.data).to.have.property('id');
        (0, _chai.expect)(response.body.data).to.have.property('firstName');
        (0, _chai.expect)(response.body.data).to.have.property('lastName');
        (0, _chai.expect)(response.body.data).to.have.property('email');
        done();
      });
    });
    it('should not register a user when the email is missing', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        firstName: 'cavdy',
        lastName: 'isaiah',
        password: 'passworD4@'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal('success');
        (0, _chai.expect)(response.body.data[0]).to.equal('Email is required');
        done();
      });
    });
    it('should not register a user when the email already exist', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        firstName: 'cavdy',
        lastName: 'isaiah',
        email: 'banka2@banka.com',
        password: 'passworD4@'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal('success');
        (0, _chai.expect)(response.body.data[0]).to.equal('email already exist');
        done();
      });
    });
    it('should not register a user when the first name is missing', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        lastName: 'isaiah',
        email: 'banka4@banka.com',
        password: 'passworD4@'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal('success');
        (0, _chai.expect)(response.body.data[0]).to.equal('Firstname required');
        done();
      });
    });
    it('should not register a user when the last name is missing', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        firstName: 'cavdy',
        email: 'banka4@banka.com',
        password: 'passworD4@'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal('success');
        (0, _chai.expect)(response.body.data[0]).to.equal('Lastname required');
        done();
      });
    });
    it('should not register a user when the password is missing', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        firstName: 'cavdy',
        lastName: 'isaiah',
        email: 'banka4@banka.com'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal('success');
        (0, _chai.expect)(response.body.data[0]).to.equal('Password should contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol or character');
        done();
      });
    });
    it('should not register a user when the password do not meet requirement', function (done) {
      _chai["default"].request(_app["default"]).post(signupUrl).send({
        firstName: 'cavdy',
        lastName: 'isaiah',
        email: 'banka4@banka.com',
        password: 'passworD4'
      }).end(function (error, response) {
        (0, _chai.expect)(response.body).to.be.an('object');
        (0, _chai.expect)(response.body.status).to.equal('success');
        (0, _chai.expect)(response.body.data[0]).to.equal('Password should contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol or character');
        done();
      });
    });
  });
});
//# sourceMappingURL=signup.js.map