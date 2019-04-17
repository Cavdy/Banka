/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';

chai.use(chaiHttp);

describe('Testing Accounts Controller', () => {
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

    // it(
    //   'should not patch account if not staff or admin',
    //   (done) => {
    //     const signinUrl = '/api/auth/signin';
    //     chai.request(app)
    //       .post(signinUrl)
    //       .send({
    //         email: 'banka@banka.com',
    //         password: 'passworD1@',
    //       })
    //       .end((error, response) => {
    //         const { token } = response.body.data;
    //         chai.request(app)
    //           .patch('/api/v1/accounts/306363789207')
    //           .set('Authorization', `Bearer ${token}`)
    //           .send({
    //             status: 'dormant',
    //           })
    //           .end((err, res) => {
    //             expect(res.body).to.be.an('object');
    //             expect(res.body.status).to.equal('success');
    //             expect(res.body.data).to.equal('Sorry you don\'t have permission to perform this task');
    //           });
    //         done();
    //       });
    //   },
    // );

    // it(
    //   'should not delete account if not staff or admin',
    //   (done) => {
    //     const signinUrl = '/api/auth/signin';
    //     chai.request(app)
    //       .post(signinUrl)
    //       .send({
    //         email: 'banka@banka.com',
    //         password: 'passworD1@',
    //       })
    //       .end((error, response) => {
    //         const { token } = response.body.data;
    //         chai.request(app)
    //           .delete('/api/v1/accounts/306363789207')
    //           .set('Authorization', `Bearer ${token}`)
    //           .send({
    //             status: 'dormant',
    //           })
    //           .end((err, res) => {
    //             expect(res.body).to.be.an('object');
    //             expect(res.body.status).to.equal('success');
    //             expect(res.body.data).to.equal('Sorry you don\'t have permission to perform this task');
    //           });
    //         done();
    //       });
    //   },
    // );

    // it(
    //   'should notify when account does not exist',
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
    //           .delete('/api/v1/accounts/306363789299')
    //           .set('Authorization', `Bearer ${token}`)
    //           .send({
    //             status: 'dormant',
    //           })
    //           .end((err, res) => {
    //             expect(res.body).to.be.an('object');
    //             expect(res.body.status).to.equal('success');
    //             expect(res.body.data).to.equal('no account found or account has been deleted');
    //           });
    //         done();
    //       });
    //   },
    // );
  });
});
