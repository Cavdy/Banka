/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';

chai.use(chaiHttp);

describe('Testing User Controller', () => {
  describe('Testing signup controller', () => {
    const signupUrl = '/api/auth/signup';
    const signupStaffUrl = '/api/auth/addstaff';
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

    it(
      'should not create staffs if not admin',
      (done) => {
        const signinUrl = '/api/auth/signin';
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'banka2@banka.com',
            password: 'passworD2@',
          })
          .end((error, response) => {
            const { token } = response.body.data;
            chai.request(app)
              .post(signupStaffUrl)
              .set('Authorization', `Bearer ${token}`)
              .send({
                firstName: 'cavdy',
                lastName: 'isaiah',
                email: 'banka4@banka.com',
                password: 'passworD4@',
              })
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('success');
                expect(res.body.data).to.equal('You must be an admin to create staffs');
              });
            done();
          });
      },
    );

    it(
      'should create staffs if admin',
      (done) => {
        const signinUrl = '/api/auth/signin';
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'banka3@banka.com',
            password: 'passworD3@',
          })
          .end((error, response) => {
            const { token } = response.body.data;
            chai.request(app)
              .post(signupStaffUrl)
              .set('Authorization', `Bearer ${token}`)
              .send({
                firstName: 'cavdy',
                lastName: 'isaiah',
                email: 'banka4@banka.com',
                password: 'passworD4@',
              })
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('success');
                expect(res.body.data).to.be.a('object');
                expect(res.body.data).to.have.property('id');
                expect(res.body.data).to.have.property('firstName');
                expect(res.body.data).to.have.property('lastName');
                expect(res.body.data).to.have.property('email');
              });
            done();
          });
      },
    );
  });
});
