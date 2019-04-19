import LoginService from '../services/login';
import statusHelper from '../helper/statusHelper';

const LoginController = {
  async loginUser(req, res) {
    const userData = req.body;
    const loggedUser = await LoginService.loginUser(userData, req.signintoken);

    const data = await statusHelper
      .statusHelper('nothing', res, loggedUser.returnStatus, loggedUser.returnError, loggedUser.returnSuccess);
    return data;
  },
};

export default LoginController;
