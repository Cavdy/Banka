import usersData from '../dummyJson/users';

const { users } = usersData;

const LoginService = {
  loginUser(userData) {
    let receiveData = 'no account found';
    for (let i = 0; i <= users.length - 1; i++) {
      if (userData.email === users[i].email && userData.password === users[i].password) {
        receiveData = userData;
      }
    }
    return receiveData;
  },
};

export default LoginService;
