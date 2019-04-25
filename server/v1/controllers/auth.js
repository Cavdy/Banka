import AuthService from '../services/auth';
import statusHelper from '../helper/statusHelper';

const AuthController = {
  /**
   * Login user
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async loginUser(req, res) {
    const userData = req.body;
    const loggedUser = await AuthService.loginUser(userData, req.signintoken);

    const data = await statusHelper
      .statusHelper(req,
        res,
        loggedUser.returnStatus,
        loggedUser.returnError,
        loggedUser.returnSuccess);
    return data;
  },

  /**
   * Signup user
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async registerUser(req, res) {
    const userData = req.body;
    const createdUser = await AuthService
      .registerUser(userData, req.signintoken);

    const data = await statusHelper
      .statusHelper(req,
        res,
        createdUser.returnStatus,
        createdUser.returnError,
        createdUser.returnSuccess);
    return data;
  },

  /**
   * Signup staff
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async createStaffs(req, res) {
    const userData = req.body;
    const createdStaff = await AuthService
      .createStaffs(userData, req.signintoken, req.authorizedData);

    const data = await statusHelper
      .statusHelper(req,
        res,
        createdStaff.returnStatus,
        createdStaff.returnError,
        createdStaff.returnSuccess);
    return data;
  },
};

export default AuthController;
