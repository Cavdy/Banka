import './accounts';
import './signin';
import './transactions';
import './users';
import './signup';

import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';

chai.use(chaiHttp);

describe('Testing Accounts Controller', () => {
  describe('Testing accounts controller', () => {
    it(
      'accounts should have all required details',
      async () => {
        const res = await chai.request(app)
          .get('/')
          .send();
        expect(res.text).to.equal('welcome to Banka API');
      },
    );
  });
});
