import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';

chai.use(chaiHttp);

describe('Testing All Users Controller', () => {
  describe('Testing all accounts controller', () => {
    it(
      'users should have all required details',
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
          .get('/api/v1/users')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(200);
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('firstname');
        expect(res.body.data[0]).to.have.property('lastname');
        expect(res.body.data[0]).to.have.property('email');
        expect(res.body.data[0]).to.have.property('password');
        expect(res.body.data[0]).to.have.property('type');
        expect(res.body.data[0]).to.have.property('isadmin');
      },
    );

    it(
      'when limit query is passed',
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
          .get('/api/v1/users?limit=10')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(200);
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('firstname');
        expect(res.body.data[0]).to.have.property('lastname');
        expect(res.body.data[0]).to.have.property('email');
        expect(res.body.data[0]).to.have.property('password');
        expect(res.body.data[0]).to.have.property('type');
        expect(res.body.data[0]).to.have.property('isadmin');
      },
    );

    it(
      'check if email does not exist',
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
          .get('/api/v1/users/banka872@ban.com/accounts')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.data).to.equal('email does not exist');
      },
    );

    it(
      'only admin or staff to see all users',
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
          .get('/api/v1/users')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.data)
          .to.equal('You don\'t have permission to view this page');
      },
    );

    it(
      'check if email does not have a bank account',
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
          .get('/api/v1/users/deleteguy2@banka.com/accounts')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.data).to.equal('no account found for this user');
      },
    );

    it(
      'get users account by email',
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
          .get('/api/v1/users')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(200);
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('firstname');
        expect(res.body.data[0]).to.have.property('lastname');
        expect(res.body.data[0]).to.have.property('email');
        expect(res.body.data[0]).to.have.property('password');
        expect(res.body.data[0]).to.have.property('type');
        expect(res.body.data[0]).to.have.property('isadmin');
      },
    );

    it(
      'if no token was passed',
      async () => {
        const res = await chai.request(app)
          .get('/api/v1/users')
          .send();
        expect(res).to.have.status(403);
      },
    );

    it(
      'if wrong token was passed',
      async () => {
        const res = await chai.request(app)
          .get('/api/v1/users')
          .set('Authorization', 'Bearer ujhhs88s88s8888')
          .send();
        expect(res.status).to.equal(403);
      },
    );

    it(
      'should not see all users if not admin or staff',
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
          .get('/api/v1/users/banka872@banka4.com/accounts')
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
      'only staffs and admin can delete users',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'banka872@banka4.com',
            password: 'passworD4@',
          });
        const { id, token } = response.body.data;
        const res = await chai.request(app)
          .delete(`/api/v1/users/${id}`)
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(401);
        expect(res.body.data)
          .to.equal('You don\'t have permission to view this page');
      },
    );

    it(
      'only admin can delete any users',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'staff@banka.com',
            password: 'passworD4@',
          });
        const { id, token } = response.body.data;
        const res = await chai.request(app)
          .delete(`/api/v1/users/${id}`)
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(401);
        expect(res.body.data)
          .to.equal('you must be an admin to delete this staff');
      },
    );

    it(
      'only admin can delete all users',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'admin@banka.com',
            password: 'passworD4@',
          });
        const res = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'deleteguy@banka.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const { id } = res.body.data;
        const res1 = await chai.request(app)
          .delete(`/api/v1/users/${id}`)
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res1.body).to.be.an('object');
        expect(res1.body.status).to.equal(200);
        expect(res1.body.data).to.equal('Account successfully deleted');
      },
    );

    it(
      'staffs can delete all users that is not a staff or admin',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'staff@banka.com',
            password: 'passworD4@',
          });
        const res = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'deleteguy2@banka.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const { id } = res.body.data;
        const res1 = await chai.request(app)
          .delete(`/api/v1/users/${id}`)
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res1.body).to.be.an('object');
        expect(res1.body.status).to.equal(200);
        expect(res1.body.data).to.equal('Account successfully deleted');
      },
    );

    it(
      'check if user does not exist as an admin',
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
          .delete('/api/v1/users/6000')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.data).to.equal('no account found');
      },
    );

    it(
      'check if user does not exist as a staff',
      async () => {
        const signinUrl = '/api/v1/auth/signin';
        const response = await chai.request(app)
          .post(signinUrl)
          .send({
            email: 'staff@banka.com',
            password: 'passworD4@',
          });
        const { token } = response.body.data;
        const res = await chai.request(app)
          .delete('/api/v1/users/6000')
          .set('Authorization', `Bearer ${token}`)
          .send();
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.data).to.equal('no account found');
      },
    );
  });
});
