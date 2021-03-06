import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import dbConnection from '../config/database';

import app from '../app';

chai.use(chaiHttp);

let acNumber;

describe('Testing Accounts Controller', () => {
  before(async () => {
    await dbConnection.dbConnect('DELETE FROM accounts');
  });
  describe('Testing accounts controller', () => {
    it(
      'when no account found',
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
        expect(res.body.status).to.equal(404);
        expect(res.body.data)
          .to.equal('no account found');
      },
    );

    for (let i = 0; i < 10; i++) {
      it(
        `accounts should have all required details ${i}`,
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
    }

    it(
      'user can view their account',
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
        const { accountNumber } = res.body.data;
        const res1 = await chai.request(app)
          .get(`/api/v1/accounts/${accountNumber}`)
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res1.body).to.be.an('object');
        expect(res1.body.status).to.equal(200);
        expect(res1.body.data).to.have.property('id');
        expect(res1.body.data).to.have.property('email');
        expect(res1.body.data).to.have.property('firstname');
        expect(res1.body.data).to.have.property('lastname');
        expect(res1.body.data).to.have.property('accountnumber');
        expect(res1.body.data).to.have.property('createdon');
        expect(res1.body.data).to.have.property('owner');
        expect(res1.body.data).to.have.property('type');
        expect(res1.body.data).to.have.property('status');
        expect(res1.body.data).to.have.property('balance');
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
        acNumber = res.body.data.map(ac => ac.accountnumber);
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
          .get('/api/v1/accounts?status=draft&limit=5')
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
      'when a user tries to view an invalid account',
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
          .get('/api/v1/accounts/8758697867544')
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
          .post('/api/v1/accounts')
          .set('Authorization', `Bearer ${token}`)
          .send({
            type: 'savings',
          });
        const { accountNumber } = res.body.data;
        const res1 = await chai.request(app)
          .get(`/api/v1/accounts/${accountNumber}`)
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res1.body).to.be.an('object');
        expect(res1.body.status).to.equal(200);
        expect(res1.body.data).to.have.property('id');
        expect(res1.body.data).to.have.property('email');
        expect(res1.body.data).to.have.property('firstname');
        expect(res1.body.data).to.have.property('lastname');
        expect(res1.body.data).to.have.property('accountnumber');
        expect(res1.body.data).to.have.property('createdon');
        expect(res1.body.data).to.have.property('owner');
        expect(res1.body.data).to.have.property('type');
        expect(res1.body.data).to.have.property('status');
        expect(res1.body.data).to.have.property('balance');
      },
    );

    it(
      'admin or staff should get any specific account',
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
          .get(`/api/v1/accounts/${acNumber[2]}`)
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
          .get(`/api/v1/accounts/${acNumber[2]}/transactions`)
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.data).to.equal('no transaction found');
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
          .get(`/api/v1/accounts/${acNumber[2]}/transactions`)
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.data).to.equal('no transaction found');
      },
    );

    it(
      'when specific account does not have permission',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'deleteguy3@banka.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const res = await chai.request(app)
          .get(`/api/v1/accounts/${acNumber[2]}`)
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.data)
          .to.equal('sorry you can\'t view another user\'s account');
      },
    );

    it(
      'when specific account transaction does not have permission',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'deleteguy3@banka.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const res = await chai.request(app)
          .get(`/api/v1/accounts/${acNumber[2]}/transactions`)
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.data)
          .to.equal('sorry you can\'t view another user\'s transactions');
      },
    );

    it(
      'when specific account does not have transaction',
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
          .get(`/api/v1/accounts/${acNumber[2]}/transactions`)
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.data).to.equal('no transaction found');
      },
    );

    it(
      'when account does not exist',
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
          .get(`/api/v1/accounts/${acNumber[2]}4499/transactions`)
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.data).to.equal('account not found');
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
        const res1 = await chai.request(app)
          .patch(`/api/v1/accounts/${acNumber[6]}`)
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
      'should not patch account if not active or dormant',
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
          .patch(`/api/v1/accounts/${accountNumber}77`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            status: 'dormants',
          });
        expect(res1.body).to.be.an('object');
        expect(res1.body.status).to.equal(422);
        expect(res1.body.data).to.equal('account status can only be active or dormant');
      },
    );

    it(
      'when account not found',
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
          .patch(`/api/v1/accounts/${accountNumber}77`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            status: 'dormant',
          });
        expect(res1.body).to.be.an('object');
        expect(res1.body.status).to.equal(404);
        expect(res1.body.data).to.equal('account not found');
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
