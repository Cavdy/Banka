/* eslint-disable no-param-reassign */
import bcrypt from 'bcryptjs';
import dbConnection from '../config/database';
import registrationHelper from '../helper/registrationHelper';
import UserModel from '../model/users';

const RegisterService = {
  async registerUser(userData, token) {
    const returnData = await registrationHelper.registrationHelper(userData);
    let returnStatus; let returnSuccess = ''; let returnError = '';

    // eslint-disable-next-line max-len
    if (returnData[0] === true && returnData[1] === true && returnData[2] === true && returnData[3] === true) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(userData.password, salt);
      userData.type = 'client';
      userData.isAdmin = false;
      // checks if email exist
      const emailresponse = await dbConnection.dbConnect('SELECT email FROM users WHERE email=$1', [userData.email]);
      if (emailresponse.rows.length >= 1) {
        returnStatus = 409;
        returnError = 'email already exist';
      } else {
        // email does not exist... you can insert data
        const response = await dbConnection.dbConnect('INSERT into users(email, firstName, lastName, password, type, isAdmin) values($1, $2, $3, $4, $5, $6)',
          [userData.email, userData.firstName, userData.lastName, hash, userData.type, userData.isAdmin]);
        if (response.command === 'INSERT') {
          const userDbData = await dbConnection.dbConnect('SELECT * FROM users WHERE email=$1', [userData.email]);
          const user = new UserModel();
          user.id = userDbData.rows[0].id;
          user.firstName = userDbData.rows[0].firstname;
          user.lastName = userDbData.rows[0].lastname;
          user.email = userDbData.rows[0].email;
          user.token = token;
          returnStatus = 201;
          returnSuccess = user;
        } else {
          returnStatus = 500;
        }
      }
    } else {
      returnStatus = 422;
      // eslint-disable-next-line prefer-destructuring
      returnError = returnData[4];
    }
    return {
      returnStatus,
      returnSuccess,
      returnError,
    };
  },

  async createStaffs(userData, token, admin) {
    const returnData = await registrationHelper.registrationHelper(userData);
    let returnStatus; let returnSuccess = ''; let returnError = '';

    const userDetails = await dbConnection
      .dbConnect('SELECT isadmin FROM users WHERE email=$1', [admin.email]);
    const { isadmin } = userDetails.rows[0];

    if (isadmin === true) {
      // eslint-disable-next-line max-len
      if (returnData[0] === true && returnData[1] === true && returnData[2] === true && returnData[3] === true) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(userData.password, salt);
        // checks if email exist
        const emailresponse = await dbConnection.dbConnect('SELECT email FROM users WHERE email=$1', [userData.email]);
        if (emailresponse.rows.length >= 1) {
          returnStatus = 409;
          returnError = 'email already exist';
        } else {
          // email does not exist... you can insert data
          const response = await dbConnection.dbConnect('INSERT into users(email, firstName, lastName, password, type, isAdmin) values($1, $2, $3, $4, $5, $6)',
            [userData.email, userData.firstName, userData.lastName, hash, userData.type, userData.isAdmin]);
          if (response.command === 'INSERT') {
            const userDbData = await dbConnection.dbConnect('SELECT * FROM users WHERE email=$1', [userData.email]);
            const user = new UserModel();
            user.id = userDbData.rows[0].id;
            user.firstName = userDbData.rows[0].firstname;
            user.lastName = userDbData.rows[0].lastname;
            user.email = userDbData.rows[0].email;
            user.token = token;
            returnStatus = 201;
            returnSuccess = user;
          } else {
            returnStatus = 500;
          }
        }
      } else {
        returnStatus = 422;
        // eslint-disable-next-line prefer-destructuring
        returnError = returnData[4];
      }
    } else {
      returnStatus = 401;
      returnError = 'you must be an admin to create staffs';
    }
    return {
      returnStatus,
      returnSuccess,
      returnError,
    };
  },
};

export default RegisterService;
