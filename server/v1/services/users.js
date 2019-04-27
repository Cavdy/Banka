import bcrypt from 'bcryptjs';
import dbConnection from '../config/database';
import UserModel from '../model/users';
import registrationHelper from '../helper/registrationHelper';

const UsersServices = {
  /**
   * Get all users
   * @constructor
   * @param {*} staff - get token details to check if staff or admin
   * @param {*} queryLimit - Get query parameter
   */
  async getAllUsers(staff, queryLimit) {
    let returnStatus; let returnSuccess = ''; let returnError = '';
    // check the users table
    const userDetails = await dbConnection
      .dbConnect('SELECT id, type, isadmin FROM users WHERE email=$1',
        [staff.email]);
    const { type, isadmin } = userDetails.rows[0];

    if (type === 'staff' || isadmin === true) {
      if (typeof queryLimit !== 'undefined') {
        const allAccounts = await dbConnection
          .dbConnect('SELECT * from users LIMIT $1', [queryLimit]);
        returnStatus = 200;
        returnSuccess = allAccounts.rows;
      } else {
        const allAccounts = await dbConnection
          .dbConnect('SELECT * from users LIMIT $1', [10]);
        returnStatus = 200;
        returnSuccess = allAccounts.rows;
      }
    } else {
      returnStatus = 401;
      returnError = 'You don\'t have permission to view this page';
    }
    return {
      returnStatus,
      returnSuccess,
      returnError,
    };
  },

  /**
   * Get user's accounts by email
   * @constructor
   * @param {*} email - get user's email
   */
  async getUsersAccounts(email) {
    let returnStatus; let returnSuccess = ''; let returnError = '';
    const allAccounts = await dbConnection
      .dbConnect('SELECT email from users WHERE email=$1', [email]);
    if (allAccounts.rows.length > 0) {
      const accountDbData = await dbConnection
        .dbConnect('SELECT * from accounts WHERE email=$1', [email]);
      if (accountDbData.rows.length > 0) {
        returnStatus = 200;
        returnSuccess = accountDbData.rows;
      } else {
        returnStatus = 404;
        returnError = 'no account found for this user';
      }
    } else {
      returnStatus = 404;
      returnError = 'email does not exist';
    }
    return {
      returnStatus,
      returnSuccess,
      returnError,
    };
  },

  /**
   * Delete user
   * @constructor
   * @param {*} id - get user id
   * @param {*} staff - get token details to check if staff or admin
   */
  async deleteUser(id, staff) {
    let returnStatus; let returnSuccess = ''; let returnError = '';
    // check the users table
    const userDetails = await dbConnection
      .dbConnect('SELECT id, type, isadmin FROM users WHERE email=$1',
        [staff.email]);
    const { type, isadmin } = userDetails.rows[0];

    if (type === 'staff') { // checks if staff
      const checkusers = await dbConnection
        .dbConnect('SELECT email, type FROM users WHERE id=$1', [id]);
      if (checkusers.rows.length > 0) {
        if (checkusers.rows[0].type === 'client') { // check if client
          const delTransactions = await dbConnection
            .dbConnect('SELECT * from accounts WHERE email=$1',
              [checkusers.rows[0].email]); // loop through db for accounts
          delTransactions.rows.map(async (del) => {
            await dbConnection
              .dbConnect('DELETE FROM transactions WHERE accountnumber=$1',
                [del.accountnumber]);
            await dbConnection
              .dbConnect('DELETE FROM accounts WHERE accountnumber=$1',
                [del.accountnumber]);
          });
          const accountDbData = await dbConnection
            .dbConnect('DELETE FROM users WHERE id=$1', [id]);
          if (accountDbData.command === 'DELETE') {
            returnStatus = 200;
            returnSuccess = 'Account successfully deleted';
          }
        } else {
          returnStatus = 401;
          returnError = 'you must be an admin to delete this staff';
        }
      } else {
        returnStatus = 404;
        returnError = 'no account found';
      }
    } else if (isadmin === true) {
      const checkusers = await dbConnection
        .dbConnect('SELECT email, type FROM users WHERE id=$1', [id]);
      if (checkusers.rows.length > 0) {
        const delTransactions = await dbConnection
          .dbConnect('SELECT * from accounts WHERE email=$1',
            [checkusers.rows[0].email]);
        delTransactions.rows.map(async (del) => {
          await dbConnection
            .dbConnect('DELETE FROM transactions WHERE accountnumber=$1',
              [del.accountnumber]);
          await dbConnection
            .dbConnect('DELETE FROM accounts WHERE accountnumber=$1',
              [del.accountnumber]);
        });
        const accountDbData = await dbConnection
          .dbConnect('DELETE FROM users WHERE id=$1', [id]);
        if (accountDbData.command === 'DELETE') {
          returnStatus = 200;
          returnSuccess = 'Account successfully deleted';
        }
      } else {
        returnStatus = 404;
        returnError = 'no account found';
      }
    } else {
      returnStatus = 401;
      returnError = 'You don\'t have permission to view this page';
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
            .dbConnect('INSERT into users(email, firstName, lastName, password, type, isAdmin) values($1, $2, $3, $4, $5, $6) RETURNING id, firstname, lastname, email',
              [userData.email, userData.firstName, userData.lastName, hash, userData.type, userData.isAdmin]);
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

export default UsersServices;
