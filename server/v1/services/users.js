import dbConnection from '../config/database';

const UsersServices = {
  async getAllUsers(staff) {
    let returnStatus; let returnSuccess = ''; let returnError = '';
    // check the users table
    const userDetails = await dbConnection
      .dbConnect('SELECT id, type, isadmin FROM users WHERE email=$1', [staff.email]);
    const { type, isadmin } = userDetails.rows[0];

    if (type === 'staff' || isadmin === true) {
      const allAccounts = await dbConnection
        .dbConnect('SELECT * from users');
      returnStatus = 200;
      returnSuccess = allAccounts.rows;
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

  async deleteUser(id, staff) {
    let returnStatus; let returnSuccess = ''; let returnError = '';
    // check the users table
    const userDetails = await dbConnection
      .dbConnect('SELECT id, type, isadmin FROM users WHERE email=$1', [staff.email]);
    const { type, isadmin } = userDetails.rows[0];

    if (type === 'staff' || isadmin === true) {
      const checkusers = await dbConnection
        .dbConnect('SELECT id FROM users WHERE id=$1', [id]);
      if (checkusers.rows.length > 0) {
        const accountDbData = await dbConnection
          .dbConnect('DELETE FROM users WHERE id=$1', [id]);
        if (accountDbData.command === 'DELETE') {
          returnStatus = 204;
          returnSuccess = 'Account successfully deleted';
        } else {
          returnStatus = 500;
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
};

export default UsersServices;
