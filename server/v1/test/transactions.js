/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import dbConnection from '../config/database';

import app from '../app';

chai.use(chaiHttp);

describe('Testing Transactions Controller', () => {
  before(async () => {
    await dbConnection
      .dbConnect('INSERT into users(email, firstName, lastName, password, type, isAdmin) values($1, $2, $3, $4, $5, $6)', ['admin@banka.com', 'cavdy', 'ikenna', '$2a$10$CmmIst1.D3QjaWuafKbBaOuAFu0r9o7xxQY.0SMKiAN.h9z52a2y2', 'staff', true]);
  });
  describe('Testing transactions controller', () => {
    it(
      'transactions should have all required propertise',
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
          .post('/api/v1/transactions/3003801983/debit')
          .set('Authorization', `Bearer ${token}`)
          .send({
            amount: 500,
          });
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.have.property('transactionId');
        expect(res.body.data).to.have.property('accountNumber');
        expect(res.body.data).to.have.property('cashier');
        expect(res.body.data).to.have.property('amount');
        expect(res.body.data).to.have.property('transactionType');
        expect(res.body.data).to.have.property('accountBalance');
      },
    );

    it(
      'only admin and staffs should perform debit transaction',
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
          .post('/api/v1/transactions/3003801983/debit')
          .set('Authorization', `Bearer ${token}`)
          .send({
            amount: 500,
          });
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.equal('You must be a staff or admin to perform this transaction');
      },
    );

    it(
      'transaction should have these propertise',
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
          .get('/api/v1/transactions/4')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('createdon');
        expect(res.body.data[0]).to.have.property('type');
        expect(res.body.data[0]).to.have.property('accountnumber');
        expect(res.body.data[0]).to.have.property('cashier');
        expect(res.body.data[0]).to.have.property('amount');
        expect(res.body.data[0]).to.have.property('oldbalance');
        expect(res.body.data[0]).to.have.property('newbalance');
      },
    );

    it(
      'only admin and staffs should perform credit transaction',
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
          .post('/api/v1/transactions/3003801983/credit')
          .set('Authorization', `Bearer ${token}`)
          .send({
            amount: 500,
          });
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.equal('You must be a staff or admin to perform this transaction');
      },
    );
  });
});
