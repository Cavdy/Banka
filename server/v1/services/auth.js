import bcrypt from 'bcryptjs';
import dbConnection from '../config/database';
import UserModel from '../model/users';
import registrationHelper from '../helper/registrationHelper';

const AuthService = {
  /**
   * Login user
   * @constructor
   * @param {*} userData - user form data.
   * @param {*} token - user's token
   */
  async loginUser(userData, token) {
    /* eslint max-len: ["error", { "ignoreRegExpLiterals": true }] */
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    let returnStatus; let returnSuccess = ''; let returnError = '';

    // Check if email and password is valid
    if (emailRegex.test(userData.email)
      && passwordRegex.test(userData.password)) {
      // check if email, if it exist get the user data
      const emailresponse = await dbConnection
        .dbConnect('SELECT * FROM users WHERE email=$1', [userData.email]);
      if (emailresponse.rows.length > 0) {
        // Load hash from your password DB.
        const passwordUnhash = bcrypt
          .compareSync(userData.password, emailresponse.rows[0].password);
        if (passwordUnhash) {
          // return users details
          const user = new UserModel();
          user.id = emailresponse.rows[0].id;
          user.firstName = emailresponse.rows[0].firstname;
          user.lastName = emailresponse.rows[0].lastname;
          user.email = emailresponse.rows[0].email;
          user.token = token;
          returnStatus = 201;
          returnSuccess = user;
        } else {
          // else echo incorrect password
          returnStatus = 422;
          returnError = 'incorrect password';
        }
      } else {
        returnStatus = 404;
        returnError = 'email does not exist';
      }
    } else {
      const error = [];
      if (!emailRegex.test(userData.email)) {
        returnStatus = 422;
        error.push('invalid email address');
      }

      if (!passwordRegex.test(userData.password)) {
        returnStatus = 422;
        error
          .push('Password should contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol or character');
      }
      returnError = error;
    }


    return {
      returnStatus,
      returnSuccess,
      returnError,
    };
  },

  /**
   * Register user
   * @constructor
   * @param {*} userData - user form data.
   * @param {*} token - user's token
   */
  async registerUser(userData, token) {
    const returnData = await registrationHelper.registrationHelper(userData);
    let returnStatus; let returnSuccess = ''; let returnError = '';

    if (returnData[0] === true
      && returnData[1] === true
      && returnData[2] === true
      && returnData[3] === true) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(userData.password, salt);
      userData.type = 'client';
      userData.isAdmin = false;
      // checks if email exist
      const emailresponse = await dbConnection
        .dbConnect('SELECT email FROM users WHERE email=$1',
          [userData.email]);
      if (emailresponse.rows.length >= 1) {
        returnStatus = 409;
        returnError = 'email already exist';
      } else {
        // email does not exist... you can insert data
        const response = await dbConnection
          .dbConnect('INSERT into users(email, firstName, lastName, password, type, isAdmin) values($1, $2, $3, $4, $5, $6)',
            [userData.email, userData.firstName, userData.lastName, hash, userData.type, userData.isAdmin]);
        if (response.command === 'INSERT') {
          const userDbData = await dbConnection
            .dbConnect('SELECT * FROM users WHERE email=$1',
              [userData.email]);
          const user = new UserModel();
          user.id = userDbData.rows[0].id;
          user.firstName = userDbData.rows[0].firstname;
          user.lastName = userDbData.rows[0].lastname;
          user.email = userDbData.rows[0].email;
          user.token = token;
          returnStatus = 201;
          returnSuccess = user;
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

  /**
   * Create staffs
   * @constructor
   * @param {*} userData - user form data.
   * @param {*} token - user's token
   * @param {*} admin - admin's token
   */
  async createStaffs(userData, token, admin) {
    const returnData = await registrationHelper.registrationHelper(userData);
    let returnStatus; let returnSuccess = ''; let returnError = '';

    const userDetails = await dbConnection
      .dbConnect('SELECT isadmin FROM users WHERE email=$1', [admin.email]);
    const { isadmin } = userDetails.rows[0];

    if (isadmin === true) {
      if (returnData[0] === true
        && returnData[1] === true
        && returnData[2] === true
        && returnData[3] === true) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(userData.password, salt);
        // checks if email exist
        const emailresponse = await dbConnection
          .dbConnect('SELECT email FROM users WHERE email=$1',
            [userData.email]);
        if (emailresponse.rows.length >= 1) {
          returnStatus = 409;
          returnError = 'email already exist';
        } else {
          // email does not exist... you can insert data
          const response = await dbConnection
            .dbConnect('INSERT into users(email, firstName, lastName, password, type, isAdmin) values($1, $2, $3, $4, $5, $6)',
              [userData.email, userData.firstName, userData.lastName, hash, userData.type, userData.isAdmin]);
          if (response.command === 'INSERT') {
            const userDbData = await dbConnection
              .dbConnect('SELECT * FROM users WHERE email=$1',
                [userData.email]);
            const user = new UserModel();
            user.id = userDbData.rows[0].id;
            user.firstName = userDbData.rows[0].firstname;
            user.lastName = userDbData.rows[0].lastname;
            user.email = userDbData.rows[0].email;
            user.token = token;
            returnStatus = 201;
            returnSuccess = user;
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

export default AuthService;