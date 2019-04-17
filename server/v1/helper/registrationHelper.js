/* eslint-disable one-var */
/* eslint-disable one-var-declaration-per-line */
const registrationHelper = {
  async registrationHelper(userData) {
    const firstnameAndLastnameRegex = /^[a-zA-Z ]{2,15}$/;
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const returnValue = [];
    let emailPassed, firstnamePassed, lastnamePassed, passwordPassed;

    // Check if email is valid
    if (emailRegex.test(userData.email)) {
      emailPassed = true;
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
