import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';

chai.use(chaiHttp);

describe('Testing Transactions Controller', () => {
  describe('Testing transactions controller', () => {
    it(
      'transactions should have all required propertise',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'admin@banka.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const res = await chai.request(app)
          .post('/api/v1/transactions/3003801983/credit')
          .set('Authorization', `Bearer ${token}`)
          .send({
            amount: 500,
          });
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(201);
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
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'banka872@banka4.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const res = await chai.request(app)
          .post('/api/v1/transactions/3003801983/credit')
          .set('Authorization', `Bearer ${token}`)
          .send({
            amount: 1000,
          });
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.data)
          .to.equal('You must be a staff or admin to perform this transaction');
      },
    );

    it(
      'should not perform debit transaction when on zero balance',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'admin@banka.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const res = await chai.request(app)
          .post('/api/v1/transactions/3404704124/debit')
          .set('Authorization', `Bearer ${token}`)
          .send({
            amount: 500,
          });
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(422);
        expect(res.body.data)
          .to.equal('Sorry this account is very low and can\'t be debited');
      },
    );

    it(
      'admin and staff can debit account',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'admin@banka.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const res = await chai.request(app)
          .post('/api/v1/transactions/3003801983/debit')
          .set('Authorization', `Bearer ${token}`)
          .send({
            amount: 500,
          });
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.have.property('transactionId');
        expect(res.body.data).to.have.property('accountNumber');
        expect(res.body.data).to.have.property('amount');
        expect(res.body.data).to.have.property('cashier');
        expect(res.body.data).to.have.property('transactionType');
        expect(res.body.data).to.have.property('accountBalance');
      },
    );

    it(
      'transaction should have these propertise',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'banka872@banka4.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const res = await chai.request(app)
          .get('/api/v1/transactions/4')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
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
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'banka872@banka4.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const res = await chai.request(app)
          .post('/api/v1/transactions/3003801983/credit')
          .set('Authorization', `Bearer ${token}`)
          .send({
            amount: 500,
          });
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.data)
          .to.equal('You must be a staff or admin to perform this transaction');
      },
    );

    it(
      'only admin and staffs should perform debit transaction',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'banka872@banka4.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const res = await chai.request(app)
          .post('/api/v1/transactions/3003801983/debit')
          .set('Authorization', `Bearer ${token}`)
          .send({
            amount: 500,
          });
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.data)
          .to.equal('You must be a staff or admin to perform this transaction');
      },
    );

    it(
      'should not debit when not number',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'admin@banka.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const res = await chai.request(app)
          .post('/api/v1/transactions/3003801983/debit')
          .set('Authorization', `Bearer ${token}`)
          .send({
            amount: 'fffff',
          });
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(422);
        expect(res.body.data)
          .to.equal('please numbers only');
      },
    );

    it(
      'should not credit when not number',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'admin@banka.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const res = await chai.request(app)
          .post('/api/v1/transactions/3003801983/credit')
          .set('Authorization', `Bearer ${token}`)
          .send({
            amount: 'fffff',
          });
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(422);
        expect(res.body.data)
          .to.equal('please numbers only');
      },
    );

    it(
      'should not credit when negative number',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'admin@banka.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const res = await chai.request(app)
          .post('/api/v1/transactions/3003801983/credit')
          .set('Authorization', `Bearer ${token}`)
          .send({
            amount: -500,
          });
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(422);
        expect(res.body.data)
          .to.equal('please numbers only');
      },
    );

    it(
      'admin and staffs can perform credit transaction',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'admin@banka.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const res = await chai.request(app)
          .post('/api/v1/transactions/3003801983/credit')
          .set('Authorization', `Bearer ${token}`)
          .send({
            amount: 500,
          });
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.have.property('transactionId');
        expect(res.body.data).to.have.property('accountNumber');
        expect(res.body.data).to.have.property('amount');
        expect(res.body.data).to.have.property('cashier');
        expect(res.body.data).to.have.property('transactionType');
        expect(res.body.data).to.have.property('accountBalance');
      },
    );

    it(
      'check if transaction id exist',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'admin@banka.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const res = await chai.request(app)
          .get('/api/v1/transactions/6000')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.data).to.equal('no transaction found');
      },
    );
  });
});
