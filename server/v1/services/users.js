import dbConnection from '../config/database';

const UsersServices = {
  async getAllUsers(staff) {
    // check the users table
    const userDetails = await dbConnection
      .dbConnect('SELECT id, type, isadmin FROM users WHERE email=$1', [staff.email]);
    const { type, isadmin } = userDetails.rows[0];

    if (type === 'staff' || isadmin === true) {
      const allAccounts = await dbConnection
        .dbConnect('SELECT * from users');
      return allAccounts.rows;
    }
    return 'You don\'t have permission to view this page';
  },

  async getUsersAccounts(email) {
    const allAccounts = await dbConnection
      .dbConnect('SELECT email from users WHERE email=$1', [email]);
    if (allAccounts.rows.length > 0) {
      const accountDbData = await dbConnection
        .dbConnect('SELECT * from accounts WHERE email=$1', [email]);
      return accountDbData.rows;
    }
    return 'no account found';
  },

  async deleteUser(id, staff) {
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
        if (accountDbData.command === 'DELETE') return 'Account successfully deleted';
      } else {
        return 'no account found';
      }
    }
    return 'You don\'t have permission to view this page';
  },
};

export default UsersServices;
