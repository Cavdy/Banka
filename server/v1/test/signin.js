import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';

chai.use(chaiHttp);

describe('Testing User Controller', () => {
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
  });
});
