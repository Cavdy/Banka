/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';

chai.use(chaiHttp);

describe('Testing All Users Controller', () => {
  describe('Testing all accounts controller', () => {
    it(
      'users should have all required details',
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
              .get('/api/v1/users')
              .set('Authorization', `Bearer ${token}`)
              .send()
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('success');
                expect(res.body.data[0]).to.have.property('id');
                expect(res.body.data[0]).to.have.property('firstName');
                expect(res.body.data[0]).to.have.property('lastName');
                expect(res.body.data[0]).to.have.property('email');
                expect(res.body.data[0]).to.have.property('password');
                expect(res.body.data[0]).to.have.property('type');
                expect(res.body.data[0]).to.have.property('isAdmin');
              });
            done();
          });
      },
    );

    it(
      'only staffs and admin can view all users',
      (done) => {
        const signinUrl = '/api/auth/signin';
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'banka@banka.com',
            password: 'passworD1@',
          })
          .end((error, response) => {
            const { token } = response.body.data;
            chai.request(app)
              .get('/api/v1/users')
              .set('Authorization', `Bearer ${token}`)
              .send()
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('success');
                expect(res.body.data).to.equal('You don\'t have permission to view this page');
              });
            done();
          });
      },
    );

    it(
      'only staffs and admin can delete users',
      (done) => {
        const signinUrl = '/api/auth/signin';
        chai.request(app)
          .post(signinUrl)
          .send({
            email: 'banka@banka.com',
            password: 'passworD1@',
          })
          .end((error, response) => {
            const { token } = response.body.data;
            chai.request(app)
              .delete('/api/v1/users/1')
              .set('Authorization', `Bearer ${token}`)
              .send()
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('success');
                expect(res.body.data).to.equal('You don\'t have permission to do this task');
              });
            done();
          });
      },
    );

    it(
      'only admin can delete staffs',
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
              .delete('/api/v1/users/2')
              .set('Authorization', `Bearer ${token}`)
              .send()
              .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal('success');
                expect(res.body.data).to.equal('Sorry you can not delete a staff');
              });
            done();
          });
      },
    );
  });
});
