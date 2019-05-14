import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import dbConnection from '../config/database';

import app from '../app';

chai.use(chaiHttp);

let secretToken2;

describe('Testing User Controller', () => {
  before(async () => {
    secretToken2 = await dbConnection
      .dbConnect('SELECT secrettoken FROM users WHERE email=$1',
        ['banka874@banka4.com']);
  });
  describe('Testing signin controller', () => {
    const signinUrl = '/api/v1/auth/signin';
    it(
      'should login when all the parameters are given',
      async () => {
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'banka872@banka4.com',
            password: 'passworD4@',
          });
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(201);
        expect(response.body.data).to.have.property('id');
        expect(response.body.data).to.have.property('email');
        expect(response.body.data).to.have.property('firstName');
        expect(response.body.data).to.have.property('lastName');
        expect(response.body.data).to.have.property('token');
      },
    );

    it(
      'should not signin a user when the email is missing',
      async () => {
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            password: 'passworD4@',
          });
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(422);
        expect(response.body.data[0]).to.equal('invalid email address');
      },
    );

    it(
      'should not signin a user when the email does not exist',
      async () => {
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'banka85576@banka4.com',
            password: 'passworD4@',
          });
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(404);
        expect(response.body.data).to.equal('email does not exist');
      },
    );

    it(
      'should not login a user when the password is missing',
      async () => {
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'banka872@banka4.com',
          });
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(422);
        expect(response.body.data[0])
          .to.equal('Password should contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol or character');
      },
    );

    it(
      'should not login a user when the password is incorrect',
      async () => {
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'banka872@banka4.com',
            password: 'passworD4@@',
          });
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(422);
        expect(response.body.data).to.equal('incorrect password');
      },
    );

    it(
      'should not login if user/email is not verified',
      async () => {
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'unverifiedguy@banka.com',
            password: 'passworD4@',
          });
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(401);
        expect(response.body.data).to.equal('Your account is not verified');
      },
    );

    it(
      'should verify user if valid',
      async () => {
        const response = await chai.request(app)
          .patch(`/api/v1/auth/verify/${secretToken2.rows[0].secrettoken}`)
          .send();
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(200);
        expect(response.body.data).to.equal('user successfully verified');
      },
    );

    it(
      'should not verify user if not valid',
      async () => {
        const response = await chai.request(app)
          .patch(`/api/v1/auth/verify/${secretToken2.rows[0].secretToken}5688rt`)
          .send();
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(422);
        expect(response.body.data).to.equal('invalid secret token');
      },
    );

    it(
      'should not register a user when the password do not meet requirement',
      async () => {
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'banka872@banka4.com',
            password: 'passworD4',
          });
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(422);
        expect(response.body.data[0])
          .to.equal('Password should contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol or character');
      },
    );

    it(
      'should not reset password if email is invalid',
      async () => {
        const response = await chai.request(app)
          .post('/api/v1/auth/reset')
          .send({
            email: 'hhhhhhgo.com',
          });
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(422);
        expect(response.body.data).to.equal('invalid email address');
      },
    );

    it(
      'should not reset password if email does not exist',
      async () => {
        const response = await chai.request(app)
          .post('/api/v1/auth/reset')
          .send({
            email: 'hhhhhhgo@hhh.com',
          });
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(404);
        expect(response.body.data).to.equal('account not found');
      },
    );

    it(
      'should reset password if all is valid',
      async () => {
        const response = await chai.request(app)
          .post('/api/v1/auth/reset')
          .send({
            email: 'deleteguy3@banka.com',
          });
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(201);
        expect(response.body.data).to.equal('reset password has been sent to your mail');
      },
    );

    it(
      'should reset password if valid',
      async () => {
        const res = await chai.request(app)
          .post('/api/v1/auth/signin')
          .send({
            email: 'deleteguy3@banka.com',
            password: 'passworD4@',
          });
        const { secretToken } = res.body.data;
        const response = await chai.request(app)
          .patch(`/api/v1/auth/forgot/${secretToken}`)
          .send({
            password: 'passworD4@',
          });
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(200);
        expect(response.body.data).to.equal('password reset successful');
      },
    );

    it(
      'should not reset password if invalid token',
      async () => {
        const response = await chai.request(app)
          .patch(`/api/v1/auth/forgot/${secretToken2.rows[0].secretToken}5688rt`)
          .send();
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(422);
        expect(response.body.data).to.equal('invalid secret token');
      },
    );
  });
});
