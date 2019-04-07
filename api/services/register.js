import usersData from '../dummyJson/users';

const { users } = usersData;

const RegisterService = {
  registerUser(userData) {
    const usersLength = users.length;
    const newId = usersLength + 1;
    userData.id = newId;
    users.push(userData);
    return userData;
  },
};

export default RegisterService;
