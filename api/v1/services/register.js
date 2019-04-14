/* eslint-disable no-param-reassign */
import usersData from '../../dummyJson/users';
import registrationHelper from '../helper/registrationHelper';

const { users } = usersData;

const RegisterService = {
  registerUser(userData) {
    const returnData = registrationHelper.registrationHelper(users, userData);
    let returnValue;
    // eslint-disable-next-line max-len
    if (returnData[0] === true && returnData[1] === true && returnData[2] === true && returnData[3] === true) {
      userData.type = 'client';
      userData.isAdmin = false;
      users.push(userData);
      returnValue = userData;
    } else {
      // eslint-disable-next-line prefer-destructuring
      returnValue = returnData[4];
    }
    return returnValue;
  },
};

export default RegisterService;
