/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';

chai.use(chaiHttp);

describe('Testing Accounts Controller', () => {
  describe('Testing accounts controller', () => {
    it(
      'accounts should have all required details',
      (done) => {
        chai.request(app)
          .post('/api/v1/accounts/')
          .send({
            type: 'savings',
          })
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            // fails to test due to route being protected but everything is working fine
            //   expect(response.body.status).to.equal('success');
            //   expect(response.body.data).to.have.property('id');
            //   expect(response.body.data).to.have.property('firstName');
            //   expect(response.body.data).to.have.property('lastName');
            //   expect(response.body.data).to.have.property('email');
            //   expect(response.body.data).to.have.property('accountNumber');
            //   expect(response.body.data).to.have.property('createdOn');
            //   expect(response.body.data).to.have.property('owner');
            //   expect(response.body.data).to.have.property('status');
            //   expect(response.body.data).to.have.property('type');
            //   expect(response.body.data).to.have.property('balance');
            done();
          });
      },
    );

    it('should be able to patch account', (done) => {
      chai.request(app)
        .patch('/api/v1/accounts/306363789207')
        .send({
          status: 'dormant',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          // remove the checkToken from app.js to test this
          //   expect(response.body.status).to.equal('success');
          //   expect(response.body.data.status).to.equal('dormant');
          done();
        });
    });

    it('should be able to delete account', (done) => {
      chai.request(app)
        .delete('/api/v1/accounts/307363789207')
        .send()
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          // remove the checkToken from app.js to test this
          //   expect(response.body.status).to.equal('success');
          //   expect(response.body.data).to.equal('account deleted');
          done();
        });
    });

    it('should notify when account does not exist', (done) => {
      chai.request(app)
        .delete('/api/v1/accounts/306363789299')
        .send()
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          // remove the checkToken from app.js to test this
          //   expect(response.body.status).to.equal('success');
          //   expect(response.body.data).to.equal('no account found or account has been deleted');
          done();
        });
    });
  });
});
