import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';

chai.use(chaiHttp);

describe('Testing Accounts Controller', () => {
  describe('Testing accounts controller', () => {
    it(
      'accounts should have all required details',
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
          .post('/api/v1/accounts')
          .set('Authorization', `Bearer ${token}`)
          .send({
            type: 'savings',
          });
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(201);
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
      'admin or staff should see all accounts',
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
          .get('/api/v1/accounts')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('email');
        expect(res.body.data[0]).to.have.property('firstname');
        expect(res.body.data[0]).to.have.property('lastname');
        expect(res.body.data[0]).to.have.property('accountnumber');
        expect(res.body.data[0]).to.have.property('createdon');
        expect(res.body.data[0]).to.have.property('owner');
        expect(res.body.data[0]).to.have.property('type');
        expect(res.body.data[0]).to.have.property('status');
        expect(res.body.data[0]).to.have.property('balance');
      },
    );

    it(
      'admin or staff should see all accounts',
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
          .get('/api/v1/accounts')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('email');
        expect(res.body.data[0]).to.have.property('firstname');
        expect(res.body.data[0]).to.have.property('lastname');
        expect(res.body.data[0]).to.have.property('accountnumber');
        expect(res.body.data[0]).to.have.property('createdon');
        expect(res.body.data[0]).to.have.property('owner');
        expect(res.body.data[0]).to.have.property('type');
        expect(res.body.data[0]).to.have.property('status');
        expect(res.body.data[0]).to.have.property('balance');
      },
    );

    it(
      'admin or staff can pass limit to see all accounts',
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
          .get('/api/v1/accounts?limit=5')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('email');
        expect(res.body.data[0]).to.have.property('firstname');
        expect(res.body.data[0]).to.have.property('lastname');
        expect(res.body.data[0]).to.have.property('accountnumber');
        expect(res.body.data[0]).to.have.property('createdon');
        expect(res.body.data[0]).to.have.property('owner');
        expect(res.body.data[0]).to.have.property('type');
        expect(res.body.data[0]).to.have.property('status');
        expect(res.body.data[0]).to.have.property('balance');
      },
    );

    it(
      'admin or staff can pass status and limit to see all accounts',
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
          .get('/api/v1/accounts?status=active&limit=5')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('email');
        expect(res.body.data[0]).to.have.property('firstname');
        expect(res.body.data[0]).to.have.property('lastname');
        expect(res.body.data[0]).to.have.property('accountnumber');
        expect(res.body.data[0]).to.have.property('createdon');
        expect(res.body.data[0]).to.have.property('owner');
        expect(res.body.data[0]).to.have.property('type');
        expect(res.body.data[0]).to.have.property('status');
        expect(res.body.data[0]).to.have.property('balance');
      },
    );

    it(
      'when query is not found',
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
          .get('/api/v1/accounts?status=engilsh&limit=5')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.data)
          .to.equal('no account found');
      },
    );

    it(
      'only admin should access all accounts',
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
          .get('/api/v1/accounts')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.data)
          .to.equal('Sorry you don\'t have permission to perform this task');
      },
    );

    it(
      'account type should only be savings or current',
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
          .post('/api/v1/accounts')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(422);
        expect(res.body.data)
          .to.equal('account type can either be savings or current');
      },
    );

    it(
      'should get specific account',
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
          .get(`/api/v1/accounts/${3003801983}`)
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data).to.have.property('firstname');
        expect(res.body.data).to.have.property('lastname');
        expect(res.body.data).to.have.property('accountnumber');
        expect(res.body.data).to.have.property('createdon');
        expect(res.body.data).to.have.property('owner');
        expect(res.body.data).to.have.property('type');
        expect(res.body.data).to.have.property('status');
        expect(res.body.data).to.have.property('balance');
      },
    );

    it(
      'when account does not have transaction',
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
          .get(`/api/v1/accounts/${3146859791}/transactions`)
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.data).to.equal('no transaction found');
      },
    );

    it(
      'when specific account does not have transaction',
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
          .get(`/api/v1/accounts/${314685979881}`)
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.data).to.equal('no account found');
      },
    );

    it(
      'should not patch account if not staff or admin',
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
        expect(res1.body.status).to.equal(401);
        expect(res1.body.data)
          .to.equal('Sorry you don\'t have permission to perform this task');
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
        const res = await chai.request(app)
          .post('/api/v1/accounts')
          .set('Authorization', `Bearer ${token}`)
          .send({
            type: 'savings',
          });
        const { accountNumber } = res.body.data;
        const res1 = await chai.request(app)
          .patch(`/api/v1/accounts/${accountNumber}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            status: 'dormant',
          });
        expect(res1.body).to.be.an('object');
        expect(res1.body.status).to.equal(200);
        expect(res1.body.data).to.have.property('accountnumber');
        expect(res1.body.data).to.have.property('status');
      },
    );

    it(
      'should not delete account if not staff or admin',
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
        expect(res1.body.status).to.equal(401);
        expect(res1.body.data)
          .to.equal('Sorry you don\'t have permission to perform this task');
      },
    );

    it(
      'should delete account if staff or admin',
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
          .post('/api/v1/accounts')
          .set('Authorization', `Bearer ${token}`)
          .send({
            type: 'savings',
          });
        const { accountNumber } = res.body.data;
        const res1 = await chai.request(app)
          .delete(`/api/v1/accounts/${accountNumber}`)
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res1.body).to.be.an('object');
        expect(res1.status).to.equal(200);
        expect(res1.body.data).to.equal('Account successfully deleted');
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
          .get('/api/v1/accounts/3003801983/transactions')
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
      'get all accounts should have these propertise',
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
          .get('/api/v1/accounts')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('email');
        expect(res.body.data[0]).to.have.property('firstname');
        expect(res.body.data[0]).to.have.property('lastname');
        expect(res.body.data[0]).to.have.property('accountnumber');
        expect(res.body.data[0]).to.have.property('createdon');
        expect(res.body.data[0]).to.have.property('owner');
        expect(res.body.data[0]).to.have.property('type');
        expect(res.body.data[0]).to.have.property('status');
        expect(res.body.data[0]).to.have.property('balance');
      },
    );

    it(
      'should notify when account does not exist',
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
          .delete('/api/v1/accounts/883939378372')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.data).to.equal('no account found');
      },
    );
  });
});
