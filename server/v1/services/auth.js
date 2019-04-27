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
    const whiteSpaces = /\s/g;

    let email;
    let fname;
    let lname;
    let password;

    // strip spaces
    if (typeof userData.email !== 'undefined') {
      email = userData.email.replace(whiteSpaces, '');
      email = userData.email.trim();
    }

    if (typeof userData.firstName !== 'undefined') {
      fname = userData.firstName.replace(whiteSpaces, '');
      fname = userData.firstName.trim();
    }

    if (typeof userData.lastName !== 'undefined') {
      lname = userData.lastName.replace(whiteSpaces, '');
      lname = userData.lastName.trim();
    }

    if (typeof userData.password !== 'undefined') {
      password = userData.password.replace(whiteSpaces, '');
      password = userData.password.trim();
    }

    if (returnData[0] === true
      && returnData[1] === true
      && returnData[2] === true
      && returnData[3] === true) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      userData.type = 'client';
      userData.isAdmin = false;
      // checks if email exist
      const emailresponse = await dbConnection
        .dbConnect('SELECT email FROM users WHERE email=$1',
          [email]);
      if (emailresponse.rows.length >= 1) {
        returnStatus = 409;
        returnError = 'email already exist';
      } else {
        // email does not exist... you can insert data
        const response = await dbConnection
          .dbConnect('INSERT into users(email, firstName, lastName, password, type, isAdmin) values($1, $2, $3, $4, $5, $6) RETURNING id, email, firstname, lastname, password, type, isadmin',
            [email, fname, lname, hash, userData.type, userData.isAdmin]);
        if (response.command === 'INSERT') {
          const user = new UserModel();
          user.id = response.rows[0].id;
          user.firstName = response.rows[0].firstname;
          user.lastName = response.rows[0].lastname;
          user.email = response.rows[0].email;
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
};

export default AuthService;
