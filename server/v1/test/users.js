/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';

chai.use(chaiHttp);

describe('Testing All Users Controller', () => {
  describe('Testing all accounts controller', () => {
    it(
      'users should have all required details',
      async () => {
        const signinUrl = '/api/auth/signin';
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
      'should not see all users if not admin or staff',
      async () => {
        const signinUrl = '/api/auth/signin';
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
        expect(res).to.have.status(401);
        expect(res.body.data).to.equal('You don\'t have permission to view this page');
      },
    );

    it(
      'only staffs and admin can delete users',
      async () => {
        const signinUrl = '/api/auth/signin';
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
        expect(res.body.data).to.equal('You don\'t have permission to view this page');
      },
    );

    it(
      'only admin can delete any users',
      async () => {
        const signinUrl = '/api/auth/signin';
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
        expect(res.body.data).to.equal('you must be an admin to delete this staff');
      },
    );
  });
});
