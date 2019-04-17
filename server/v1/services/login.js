import bcrypt from 'bcryptjs';
import dbConnection from '../config/database';
import UserModel from '../model/users';

const LoginService = {
  async loginUser(userData, token) {
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const returnValue = [];

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
          user.type = emailresponse.rows[0].type;
          user.isAdmin = emailresponse.rows[0].isadmin;
          user.token = token;
          returnValue.push(user);
        } else {
          // else echo incorrect password
          returnValue.push('incorrect password');
        }
      } else {
        returnValue.push('email does not exist');
      }
    }

    const checkError = (regex, data, msg) => {
      if (!regex.test(data)) {
        returnValue.push(msg);
      }
    };

    checkError(emailRegex, userData.email, 'invalid email address');
    checkError(passwordRegex, userData.password, 'Password should contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol or character');

    return returnValue;
  },
};

export default LoginService;
