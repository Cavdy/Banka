import bcrypt from 'bcryptjs';
import dbConnection from '../config/database';
import UserModel from '../model/users';

const LoginService = {
  async loginUser(userData, token) {
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    let returnStatus; let returnSuccess = ''; let returnError = '';

    // Check if email and password is valid
    if (emailRegex.test(userData.email) && passwordRegex.test(userData.password)) {
      // check if email, if it exist get the user data
      const emailresponse = await dbConnection.dbConnect('SELECT * FROM users WHERE email=$1', [userData.email]);
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
        error.push('Password should contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol or character');
      }
      returnError = error;
    }


    return {
      returnStatus,
      returnSuccess,
      returnError,
    };
  },
};

export default LoginService;
