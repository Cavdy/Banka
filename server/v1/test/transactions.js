// /* eslint-disable no-undef */
// import chaiHttp from 'chai-http';
// import chai, { expect } from 'chai';

// import app from '../app';

// chai.use(chaiHttp);

// describe('Testing Transactions Controller', () => {
//   describe('Testing transactions controller', () => {
//     it(
//       'transactions should have all required propertise',
//       (done) => {
//         const signinUrl = '/api/auth/signin';
//         chai.request(app)
//           .post(signinUrl)
//           .send({
//             email: 'banka3@banka.com',
//             password: 'passworD3@',
//           })
//           .end((error, response) => {
//             const { token } = response.body.data;
//             chai.request(app)
//               .post('/api/v1/transactions/306363789207/debit')
//               .set('Authorization', `Bearer ${token}`)
//               .send({
//                 amount: 200,
//               })
//               .end((err, res) => {
//                 expect(res.body).to.be.an('object');
//                 expect(res.body.status).to.equal('success');
//                 expect(res.body.status).to.equal('success');
//                 expect(res.body.data).to.have.property('id');
//                 expect(res.body.data).to.have.property('createdOn');
//                 expect(res.body.data).to.have.property('type');
//                 expect(res.body.data).to.have.property('accountNumber');
//                 expect(res.body.data).to.have.property('cashier');
//                 expect(res.body.data).to.have.property('amount');
//                 expect(res.body.data).to.have.property('oldBalance');
//                 expect(res.body.data).to.have.property('newBalance');
//               });
//             done();
//           });
//       },
//     );

//     it(
//       'only admin and staffs should perform debit transaction',
//       (done) => {
//         const signinUrl = '/api/auth/signin';
//         chai.request(app)
//           .post(signinUrl)
//           .send({
//             email: 'banka@banka.com',
//             password: 'passworD1@',
//           })
//           .end((error, response) => {
//             const { token } = response.body.data;
//             chai.request(app)
//               .post('/api/v1/transactions/306363789207/debit')
//               .set('Authorization', `Bearer ${token}`)
//               .send({
//                 amount: 200,
//               })
//               .end((err, res) => {
//                 expect(res.body).to.be.an('object');
//                 expect(res.body.status).to.equal('success');
//                 expect(res.body.data).to.equal('you must be a staff to perform this transaction');
//               });
//             done();
//           });
//       },
//     );

//     it(
//       'only admin and staffs should perform credit transaction',
//       (done) => {
//         const signinUrl = '/api/auth/signin';
//         chai.request(app)
//           .post(signinUrl)
//           .send({
//             email: 'banka@banka.com',
//             password: 'passworD1@',
//           })
//           .end((error, response) => {
//             const { token } = response.body.data;
//             chai.request(app)
//               .post('/api/v1/transactions/306363789207/credit')
//               .set('Authorization', `Bearer ${token}`)
//               .send({
//                 amount: 200,
//               })
//               .end((err, res) => {
//                 expect(res.body).to.be.an('object');
//                 expect(res.body.status).to.equal('success');
//                 expect(res.body.data).to.equal('you must be a staff to perform this transaction');
//               });
//             done();
//           });
//       },
//     );
//   });
// });
