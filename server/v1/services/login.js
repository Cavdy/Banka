import usersData from '../../dummyJson/users';

const { users } = usersData;

const LoginService = {
  loginUser(userData) {
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    let returnValue = [];

    // Check if email and password is valid
    if (emailRegex.test(userData.email) && passwordRegex.test(userData.password)) {
      let checkDetails = false;

      // check if account exist
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i <= users.length - 1; i++) {
        if (users[i].email === userData.email && users[i].password === userData.password) {
          returnValue = users[i];
          checkDetails = true;
        }
      }

      // gives output
      if (!checkDetails) {
        returnValue.push('incorrect credentials');
      }
    } else {
      returnValue.push('Invalid format');
    }

    return returnValue;
  },
};

export default LoginService;
