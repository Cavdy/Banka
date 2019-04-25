const registrationHelper = {
  /**
   * Return validation status
   * @constructor
   * @param {*} userData - passed in user's data.
   */
  async registrationHelper(userData) {
    const firstnameAndLastnameRegex = /^[a-zA-Z ]{2,15}$/;
    /* eslint max-len: ["error", { "ignoreRegExpLiterals": true }] */
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const whiteSpaces = /\s/g;
    const returnValue = [];
    let emailPassed, firstnamePassed, lastnamePassed, passwordPassed;

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

    // Check if email is valid
    if (emailRegex.test(email)
      && email !== '') {
      emailPassed = true;
    } else {
      returnValue.push('Email is required');
    }

    if (firstnameAndLastnameRegex.test(fname)
      && typeof fname === 'string'
      && fname !== '') {
      firstnamePassed = true;
    } else {
      returnValue.push('Firstname required');
    }
    if (firstnameAndLastnameRegex.test(lname)
      && typeof lname === 'string'
      && lname !== '') {
      lastnamePassed = true;
    } else {
      returnValue.push('Lastname required');
    }
    if (passwordRegex.test(password)
      && typeof password === 'string'
      && password !== '') {
      passwordPassed = true;
    } else {
      returnValue
        .push('Password should contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol or character');
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
