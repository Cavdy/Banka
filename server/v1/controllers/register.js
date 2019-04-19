import RegisterService from '../services/register';
import statusHelper from '../helper/statusHelper';

const RegisterController = {
  async registerUser(req, res) {
    const userData = req.body;
    const createdUser = await RegisterService.registerUser(userData, req.signintoken);

    const data = await statusHelper
      .statusHelper('nothing', res, createdUser.returnStatus, createdUser.returnError, createdUser.returnSuccess);
    return data;
  },

  async createStaffs(req, res) {
    const userData = req.body;
    const createdStaff = await RegisterService
      .createStaffs(userData, req.signintoken, req.authorizedData);

    const data = await statusHelper
      .statusHelper('nothing', res, createdStaff.returnStatus, createdStaff.returnError, createdStaff.returnSuccess);
    return data;
  },
};

export default RegisterController;
