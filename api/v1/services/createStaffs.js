/* eslint-disable no-param-reassign */
import usersData from '../../dummyJson/users';
import registrationHelper from '../helper/registrationHelper';

const { users } = usersData;

const CreateStaffService = {
  createStaffUser(userData, admin) {
    const returnData = registrationHelper.registrationHelper(users, userData);
    let returnValue;
    // eslint-disable-next-line max-len
    if (returnData[0] === true && returnData[1] === true && returnData[2] === true && returnData[3] === true) {
      if (admin.loggedUser.isAdmin === true) {
        userData.type = 'staff';
        userData.isAdmin = false;
        users.push(userData);
        returnValue = userData;
      } else {
        returnValue = 'You must be an admin to create staffs';
      }
    } else {
      // eslint-disable-next-line prefer-destructuring
      returnValue = returnData[4];
    }
    return returnValue;
  },
};

export default CreateStaffService;
