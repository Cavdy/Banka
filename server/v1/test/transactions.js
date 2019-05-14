import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import dbConnection from '../config/database';

import app from '../app';

chai.use(chaiHttp);

let acNumber;

describe('Testing Transactions Controller', () => {
  before(async () => {
    await dbConnection.dbConnect('DELETE FROM transactions');
    const acN = await dbConnection
      .dbConnect('SELECT accountnumber FROM accounts WHERE email=$1',
        ['banka872@banka4.com']);

    acNumber = acN.rows.map(ac => ac.accountnumber);
  });
  describe('Testing transactions controller', () => {
    it(
      'when no transaction found with limit',
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
          .get('/api/v1/transactions?limit=6')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.data).to.equal('no transaction found');
      },
    );

    it(
      'when no transaction found without limit',
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
          .get('/api/v1/transactions')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.data).to.equal('no transaction found');
      },
    );

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
          .post(`/api/v1/transactions/${acNumber[5]}/credit`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            amount: 5000,
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
          .post(`/api/v1/transactions/${acNumber[5]}/credit`)
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
      'should not debit an account when inactive',
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
          .post(`/api/v1/transactions/${acNumber[3]}/debit`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            amount: 5000,
          });
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.data)
          .to.equal('Sorry can not debit an inactive account');
      },
    );

    it(
      'should patch account if staff or admin',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'admin@banka.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const res1 = await chai.request(app)
          .patch(`/api/v1/accounts/${acNumber[6]}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            status: 'active',
          });
        expect(res1.body).to.be.an('object');
        expect(res1.body.status).to.equal(200);
        expect(res1.body.data).to.have.property('accountnumber');
        expect(res1.body.data).to.have.property('status');
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
          .post(`/api/v1/transactions/${acNumber[6]}/debit`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            amount: 50000,
          });
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(422);
        expect(res.body.data)
          .to.equal('Sorry this account is very low and can\'t be debited');
      },
    );

    it(
      'should patch account if staff or admin',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'admin@banka.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const res1 = await chai.request(app)
          .patch(`/api/v1/accounts/${acNumber[5]}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            status: 'active',
          });
        expect(res1.body).to.be.an('object');
        expect(res1.body.status).to.equal(200);
        expect(res1.body.data).to.have.property('accountnumber');
        expect(res1.body.data).to.have.property('status');
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
          .post(`/api/v1/transactions/${acNumber[5]}/debit`)
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
        const resp = await chai.request(app)
          .get(`/api/v1/accounts/${acNumber[5]}/transactions`)
          .set('Authorization', `Bearer ${token}`)
          .send();
        const transID = resp.body.data[0].id;
        const res = await chai.request(app)
          .get(`/api/v1/transactions/${transID}`)
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
          .post(`/api/v1/transactions/${acNumber[5]}/credit`)
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
          .post(`/api/v1/transactions/${acNumber[6]}/debit`)
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
          .post(`/api/v1/transactions/${acNumber[6]}/debit`)
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
          .post(`/api/v1/transactions/${acNumber[5]}/credit`)
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
          .post(`/api/v1/transactions/${acNumber[5]}/credit`)
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
          .post(`/api/v1/transactions/${acNumber[5]}/credit`)
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
          .get('/api/v1/transactions/60000000')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.data).to.equal('no transaction found');
      },
    );

    it(
      'admin or staff should get any specific account transactions',
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
          .get(`/api/v1/accounts/${acNumber[5]}/transactions`)
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
          .get(`/api/v1/accounts/${acNumber[5]}/transactions`)
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
      'admin or staff can get all transactions with limit',
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
          .get('/api/v1/transactions?limit=6')
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
      'admin or staff can get all transactions without limit',
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
          .get('/api/v1/transactions')
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
      'can not view all transactions if not admin or staff',
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
          .get('/api/v1/transactions')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.data)
          .to.equal('Sorry you don\'t have permission to perform this task');
      },
    );
  });
});
