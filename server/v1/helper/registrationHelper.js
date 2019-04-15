/* eslint-disable one-var */
/* eslint-disable one-var-declaration-per-line */
const registrationHelper = {
  registrationHelper(users, userData) {
    const firstnameAndLastnameRegex = /^[a-zA-Z ]{2,15}$/;
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const returnValue = [];
    let emailPassed, firstnamePassed, lastnamePassed, passwordPassed;

    const usersLength = users.length;
    const newId = usersLength + 1;
    // eslint-disable-next-line no-param-reassign
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
      returnValue.push('Email is required');
    }

    if (firstnameAndLastnameRegex.test(userData.firstName) && typeof userData.firstName !== 'undefined' && userData.firstName !== null) {
      firstnamePassed = true;
    } else {
      returnValue.push('Firstname required');
    }
    if (firstnameAndLastnameRegex.test(userData.lastName) && typeof userData.lastName !== 'undefined' && userData.lastName !== null) {
      lastnamePassed = true;
    } else {
      returnValue.push('Lastname required');
    }
    if (passwordRegex.test(userData.password) && typeof userData.password !== 'undefined' && userData.password !== null) {
      passwordPassed = true;
    } else {
      returnValue.push('Password should contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol or character');
    }

    return [
      firstnamePassed,
      lastnamePassed,
      emailPassed,
      passwordPassed,
      returnValue,
    ];
  },
};

export default registrationHelper;
