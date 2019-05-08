import bcrypt from 'bcryptjs';
import randomString from 'randomstring';
import dbConnection from '../config/database';
import UserModel from '../model/users';
import registrationHelper from '../helper/registrationHelper';
import sendEmail from '../config/mailer';

const secretToken = randomString.generate();

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
          // if user is verified
          if (emailresponse.rows[0].verify) {
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
            returnStatus = 401;
            returnError = 'Your account is not verified';
          }
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
   * Verify user
   * @constructor
   * @param {*} verifyToken - secret token.
   */
  async verifyUser(verifyToken) {
    let returnStatus; let returnSuccess = ''; let returnError = '';

    const verifyUser = await dbConnection
      .dbConnect('SELECT verify FROM users WHERE secretToken=$1',
        [verifyToken]);

    if (verifyUser.rows.length >= 1) {
      const updateUser = await dbConnection
        .dbConnect('UPDATE users SET verify=$1, secretToken=$2 WHERE secretToken=$3',
          [true, '', verifyToken]);
      if (updateUser.command === 'UPDATE') {
        returnStatus = 200;
        returnSuccess = 'user successfully verified';
      }
    } else {
      returnStatus = 422;
      returnError = 'invalid secret token';
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
   */
  async registerUser(userData) {
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
          .dbConnect('INSERT into users(email, firstName, lastName, password, type, isAdmin, verify, secretToken) values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, email, firstname, lastname, password, type, isadmin, verify',
            [email, fname, lname, hash, userData.type, userData.isAdmin, 'false', secretToken]);
        if (response.command === 'INSERT') {
          const html = `<div style='width:100%;text-align:center;'>
              <h2 style='color:#2196F3;background-color:#2196F3;color:#ffffff;padding:2rem 0;'>Welcome to Banka ${response.rows[0].lastname} ${response.rows[0].firstname}<h2>
              <br />
              We are thrilled to have you at Banka, below is the link to verify your account
              <br /><br />
              <a style='text-decoration:none;background-color:#2196F3;color:#ffffff;padding:1rem 1.5rem;' href="https://cavdy.github.io/Banka/login.html?secret=${secretToken}">Verify</a>
              <br /><br />
              If you can not click on the button above, copy this link <strong>https://cavdy.github.io/Banka/login.html?secret=${secretToken}</strong>
              <br /><br />
              Thank You.
            </div>
            `;

          await sendEmail
            .sendEmail('do_not_reply@banka.com',
              response.rows[0].email, 'Verify your email', html);
          returnStatus = 201;
          returnSuccess = 'Successfully signed up, check your email for verification';
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
