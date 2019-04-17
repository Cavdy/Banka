/* eslint-disable no-undef */
import '@babel/polyfill';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import dbConnection from '../config/database';

import app from '../app';

chai.use(chaiHttp);

describe('Testing User Controller', () => {
  before(async () => {
    await dbConnection.dbTesting('DELETE FROM users');
  });
  describe('Testing signup controller', () => {
    const signupUrl = '/api/auth/signup';
    const signupStaffUrl = '/api/auth/addstaff';
    it(
      'should register a new user when all the parameters are given',
      async () => {
        const response = await chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'cavdy',
            lastName: 'isaiah',
            email: 'banka872@banka4.com',
            password: 'passworD4@',
          });
        expect(response).to.be.an('object');
        expect(response.body.status).to.equal('success');
        expect(response.body.data).to.have.property('id');
        expect(response.body.data).to.have.property('firstName');
        expect(response.body.data).to.have.property('lastName');
        expect(response.body.data).to.have.property('email');
        expect(response.body.data).to.have.property('token');
      },
    );

    it(
      'should not register a user when the email already exist',
      async () => {
        const response = await chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'cavdy',
            lastName: 'isaiah',
            email: 'banka872@banka4.com',
            password: 'passworD4@',
          });
        expect(response).to.be.an('object');
        expect(response.body.status).to.equal('success');
        expect(response.body.data).to.equal('email already exist');
      },
    );

    it(
      'should not register a user when the email is missing',
      async () => {
        const response = await chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'cavdy',
            lastName: 'isaiah',
            password: 'passworD4@',
          });
        expect(response).to.be.an('object');
        expect(response.body.status).to.equal('success');
        expect(response.body.data[0]).to.equal('Email is required');
      },
    );

    it(
      'should not register a user when the first name is missing',
      async () => {
        const response = await chai.request(app)
          .post(signupUrl)
          .send({
            lastName: 'isaiah',
            email: 'banka873@banka4.com',
            password: 'passworD4@',
          });
        expect(response).to.be.an('object');
        expect(response.body.status).to.equal('success');
        expect(response.body.data[0]).to.equal('Firstname required');
      },
    );

    it(
      'should not register a user when the last name is missing',
      async () => {
        const response = await chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'cavdy',
            email: 'banka873@banka4.com',
            password: 'passworD4@',
          });
        expect(response).to.be.an('object');
        expect(response.body.status).to.equal('success');
        expect(response.body.data[0]).to.equal('Lastname required');
      },
    );

    it(
      'should not register a user when the password is missing',
      async () => {
        const response = await chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'cavdy',
            lastName: 'isaiah',
            email: 'banka873@banka4.com',
          });
        expect(response).to.be.an('object');
        expect(response.body.status).to.equal('success');
        expect(response.body.data[0]).to.equal('Password should contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol or character');
      },
    );
    it(
      'should not register a user when the password do not meet requirement',
      async () => {
        const response = await chai.request(app)
          .post(signupUrl)
          .send({
            firstName: 'cavdy',
            lastName: 'isaiah',
            email: 'banka873@banka4.com',
            password: 'passworD4',
          });
        expect(response).to.be.an('object');
        expect(response.body.status).to.equal('success');
        expect(response.body.data[0]).to.equal('Password should contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol or character');
      },
    );

    // it(
    //   'should not create staffs if not admin',
    //   async () => {
    //     await chai.request(app)
    //       .post(signupUrl)
    //       .send({
    //         firstName: 'cavdy',
    //         lastName: 'isaiah',
    //         email: 'bankaadmin@banka.com',
    //         password: 'passworadmiN4@',
    //         isAdmin: true,
    //       });
    //     const signinUrl = '/api/auth/signin';
    //     const response = await chai.request(app)
    //       .post(signinUrl)
    //       .send({
    //         email: 'bankaadmin@banka.com',
    //         password: 'passworadmiN4@',
    //       });
    //       console.log(response.body);
    //     const { token } = response.body.data[0];
    //     const res = await chai.request(app)
    //       .post(signupStaffUrl)
    //       .set('Authorization', `Bearer ${token}`)
    //       .send({
    //         firstName: 'cavdy',
    //         lastName: 'isaiah',
    //         email: 'banka4@banka.com',
    //         password: 'passworD4@',
    //       });
    //     expect(res.body).to.be.an('object');
    //     expect(res.body.status).to.equal('success');
    //     expect(res.body.data).to.equal('You must be an admin to create staffs');
    //   },
    // );

    // it(
    //   'should create staffs if admin',
    //   (done) => {
    //     const signinUrl = '/api/auth/signin';
    //     chai.request(app)
    //       .post(signinUrl)
    //       .send({
    //         email: 'banka3@banka.com',
    //         password: 'passworD3@',
    //       })
    //       .end((error, response) => {
    //         const { token } = response.body.data;
    //         chai.request(app)
    //           .post(signupStaffUrl)
    //           .set('Authorization', `Bearer ${token}`)
    //           .send({
    //             firstName: 'cavdy',
    //             lastName: 'isaiah',
    //             email: 'banka4@banka.com',
    //             password: 'passworD4@',
    //           })
    //           .end((err, res) => {
    //             expect(res.body).to.be.an('object');
    //             expect(res.body.status).to.equal('success');
    //             expect(res.body.data).to.be.a('object');
    //             expect(res.body.data).to.have.property('id');
    //             expect(res.body.data).to.have.property('firstName');
    //             expect(res.body.data).to.have.property('lastName');
    //             expect(res.body.data).to.have.property('email');
    //           });
    //         done();
    //       });
    //   },
    // );
  });
});
