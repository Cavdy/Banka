// /* eslint-disable no-undef */
// import chaiHttp from 'chai-http';
// import chai, { expect } from 'chai';

// import app from '../app';

// chai.use(chaiHttp);

// describe('Testing User Controller', () => {
//   describe('Testing signin controller', () => {
//     const signinUrl = '/api/auth/signin';
//     it(
//       'should login when all the parameters are given',
//       (done) => {
//         chai.request(app)
//           .post(signinUrl)
//           .send({
//             email: 'banka2@banka.com',
//             password: 'passworD2@',
//           })

//           .end((error, response) => {
//             expect(response.body).to.be.an('object');
//             expect(response).to.have.status(200);
//             expect(response.body.data).to.be.a('object');
//             expect(response.body.data.loggedUser).to.have.property('id');
//             expect(response.body.data.loggedUser).to.have.property('email');
//             expect(response.body.data).to.have.property('token');
//             done();
//           });
//       },
//     );

//     it('should not signin a user when the email is missing', (done) => {
//       chai.request(app)
//         .post(signinUrl)
//         .send({
//           password: 'passworD4@',
//         })
//         .end((error, response) => {
//           expect(response.body).to.be.an('object');
//           expect(response.body.status).to.equal('error');
//           expect(response.body.data).to.equal('incorrect data');
//           done();
//         });
//     });

//     it('should not signin a user when the email does not exist', (done) => {
//       chai.request(app)
//         .post(signinUrl)
//         .send({
//           email: 'banka5@banka.com',
//           password: 'passworD4@',
//         })
//         .end((error, response) => {
//           expect(response.body).to.be.an('object');
//           expect(response.body.status).to.equal('error');
//           expect(response.body.data).to.equal('incorrect data');
//           done();
//         });
//     });

//     it('should not register a user when the password is missing', (done) => {
//       chai.request(app)
//         .post(signinUrl)
//         .send({
//           email: 'banka4@banka.com',
//         })
//         .end((error, response) => {
//           expect(response.body).to.be.an('object');
//           expect(response.body.status).to.equal('error');
//           expect(response.body.data).to.equal('incorrect data');
//           done();
//         });
//     });

//     it('should not register a user when the password do not meet requirement', (done) => {
//       chai.request(app)
//         .post(signinUrl)
//         .send({
//           email: 'banka2@banka.com',
//           password: 'passworD4',
//         })
//         .end((error, response) => {
//           expect(response.body).to.be.an('object');
//           expect(response.body.status).to.equal('error');
//           expect(response.body.data).to.equal('incorrect data');
//           done();
//         });
//     });
//   });
// });
