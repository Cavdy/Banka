/* eslint-disable no-param-reassign */
import usersData from '../dummyJson/users';

const { users } = usersData;

const RegisterService = {
  registerUser(userData) {
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    let returnValue = [];
    let emailPassed;
    let passwordPassed;

    const usersLength = users.length;
    const newId = usersLength + 1;
    userData.id = newId;

    // Check if email is valid
    if (emailRegex.test(userData.email)) {
      let checkEmail = false;

      // check if email is exist
      for (let i = 0; i <= usersLength - 1; i++) {
        if (users[i].email === userData.email) {
          checkEmail = true;
        }
      }

      // gives output
      if (checkEmail) {
        returnValue.push('email already exist');
      } else {
        emailPassed = true;
      }
    } else {
      returnValue.push('Invalid email');
    }

    if (passwordRegex.test(userData.password)) {
      passwordPassed = true;
    } else {
      returnValue.push('Password should contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol or character');
    }

    if (emailPassed === true && passwordPassed === true) {
      users.push(userData);
      returnValue = userData;
    }
    return returnValue;
  },
};

export default RegisterService;
