/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import dbConnection from '../config/database';

import app from '../app';

chai.use(chaiHttp);

describe('Testing Accounts Controller', () => {
  before(async () => {
    await dbConnection
      .dbConnect('INSERT into users(email, firstName, lastName, password, type, isAdmin) values($1, $2, $3, $4, $5, $6)', ['admin@banka.com', 'cavdy', 'ikenna', '$2a$10$CmmIst1.D3QjaWuafKbBaOuAFu0r9o7xxQY.0SMKiAN.h9z52a2y2', 'staff', true]);
  });
  describe('Testing accounts controller', () => {
    it(
      'accounts should have all required details',
      async () => {
        const signinUrl = '/api/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'banka872@banka4.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data[0];
        const res = await chai.request(app)
          .post('/api/v1/accounts')
          .set('Authorization', `Bearer ${token}`)
          .send({
            type: 'savings',
          });
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('accountNumber');
        expect(res.body.data).to.have.property('createdOn');
        expect(res.body.data).to.have.property('owner');
        expect(res.body.data).to.have.property('type');
        expect(res.body.data).to.have.property('status');
        expect(res.body.data).to.have.property('balance');
      },
    );

    it(
      'should not patch account if not staff or admin',
      async () => {
        const signinUrl = '/api/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'banka872@banka4.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data[0];
        const res = await chai.request(app)
          .post('/api/v1/accounts')
          .set('Authorization', `Bearer ${token}`)
          .send({
            type: 'savings',
          });
        const { accountnumber } = res.body.data;
        const res1 = await chai.request(app)
          .patch(`/api/v1/accounts/${accountnumber}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            status: 'dormant',
          });
        expect(res1.body).to.be.an('object');
        expect(res1.body.status).to.equal('success');
        expect(res1.body.data).to.equal('Sorry you don\'t have permission to perform this task');
      },
    );

    it(
      'should not delete account if not staff or admin',
      async () => {
        const signinUrl = '/api/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'banka872@banka4.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data[0];
        const res = await chai.request(app)
          .post('/api/v1/accounts')
          .set('Authorization', `Bearer ${token}`)
          .send({
            type: 'savings',
          });
        const { accountnumber } = res.body.data;
        const res1 = await chai.request(app)
          .delete(`/api/v1/accounts/${accountnumber}`)
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res1.body).to.be.an('object');
        expect(res1.body.status).to.equal('success');
        expect(res1.body.data).to.equal('Sorry you don\'t have permission to perform this task');
      },
    );

    it(
      'should notify when account does not exist',
      async () => {
        const signinUrl = '/api/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'admin@banka.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data[0];
        const res = await chai.request(app)
          .delete('/api/v1/accounts/883939378372')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.equal('no account found');
      },
    );
  });
});
