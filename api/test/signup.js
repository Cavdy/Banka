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
            firstName: 'mike',
            lastName: 'umanah',
            email: 'test@test.com',
            password: 'password',
          })

          .end((error, response) => {
            // console.log('error', response);
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(201);
            expect(response.body.status).to.equal(201);
            expect(response.body.data).to.be.a('object');
            expect(response.body.data).to.have.property('id');
            expect(response.body.data).to.have.property('firstName');
            expect(response.body.data).to.have.property('lastName');
            expect(response.body.data).to.have.property('email');
            expect(response.body.data.email).to.equal('test@test.com');
            done();
          });
      },
    );

    it('should not register a user when the email is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'michael',
          lastName: 'Umanah',
          username: 'michael123',
          password: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email is required');
          done();
        });
    });

    it('should not register a user when the first name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          lastName: 'Umanah',
          username: 'michael123',
          password: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('First name is required');
          done();
        });
    });


    it('should not register a user when the last name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Umanah',
          username: 'michael123',
          password: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Last name is required');
          done();
        });
    });

    it('should not register a user when the password is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'mike234@gmail,com',
          firstName: 'Umanah',
          lastName: 'michael123',
          username: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Password is required');
          done();
        });
    });

    it('should not register a user when the email already exist', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'mike',
          lastName: 'umanah',
          email: 'test@test.com',
          password: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email already exist');
          done();
        });
    });
  });
});
