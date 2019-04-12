/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';

chai.use(chaiHttp);

describe('Testing User Controller', () => {
  describe('Testing signup controller', () => {
    const signupUrl = '/api/auth/signup';
    it(
      'should register a new user when all the parameters are given',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'cavdy',
            lastName: 'isaiah',
            email: 'banka4@banka4.com',
            password: 'passworD4@',
          })

          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(200);
            expect(response.body.data).to.be.a('object');
            expect(response.body.data).to.have.property('id');
            expect(response.body.data).to.have.property('firstName');
            expect(response.body.data).to.have.property('lastName');
            expect(response.body.data).to.have.property('email');
            done();
          });
      },
    );

    it('should not register a user when the email is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'cavdy',
          lastName: 'isaiah',
          password: 'passworD4@',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal('success');
          expect(response.body.data[0]).to.equal('Email is required');
          done();
        });
    });

    it('should not register a user when the email already exist', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'cavdy',
          lastName: 'isaiah',
          email: 'banka2@banka.com',
          password: 'passworD4@',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal('success');
          expect(response.body.data[0]).to.equal('email already exist');
          done();
        });
    });

    it('should not register a user when the first name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          lastName: 'isaiah',
          email: 'banka4@banka.com',
          password: 'passworD4@',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal('success');
          expect(response.body.data[0]).to.equal('Firstname required');
          done();
        });
    });

    it('should not register a user when the last name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'cavdy',
          email: 'banka4@banka.com',
          password: 'passworD4@',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal('success');
          expect(response.body.data[0]).to.equal('Lastname required');
          done();
        });
    });

    it('should not register a user when the password is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'cavdy',
          lastName: 'isaiah',
          email: 'banka4@banka.com',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal('success');
          expect(response.body.data[0]).to.equal('Password should contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol or character');
          done();
        });
    });

    it('should not register a user when the password do not meet requirement', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'cavdy',
          lastName: 'isaiah',
          email: 'banka4@banka.com',
          password: 'passworD4',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal('success');
          expect(response.body.data[0]).to.equal('Password should contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol or character');
          done();
        });
    });
  });
});
