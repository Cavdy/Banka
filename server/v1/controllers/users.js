import UserService from '../services/users';
import statusHelper from '../helper/statusHelper';

const UsersController = {
  /**
   * Get users
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async getAllUsers(req, res) {
    const queryLimit = req.query.limit;
    const allUsers = await UserService
      .getAllUsers(req.authorizedData, queryLimit);

    const data = await statusHelper
      .statusHelper(req,
        res,
        allUsers.returnStatus,
        allUsers.returnError,
        allUsers.returnSuccess);
    return data;
  },

  /**
   * Get staffs
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async getAllStaffs(req, res) {
    const queryLimit = req.query.limit;
    const allUsers = await UserService
      .getAllStaffs(req.authorizedData, queryLimit);

    const data = await statusHelper
      .statusHelper(req,
        res,
        allUsers.returnStatus,
        allUsers.returnError,
        allUsers.returnSuccess);
    return data;
  },
  
  /**
   * Get clients
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async getAllClients(req, res) {
    const queryLimit = req.query.limit;
    const allUsers = await UserService
      .getAllClients(req.authorizedData, queryLimit);

    const data = await statusHelper
      .statusHelper(req,
        res,
        allUsers.returnStatus,
        allUsers.returnError,
        allUsers.returnSuccess);
    return data;
  },

  /**
   * Get user accounts
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async getUsersAccounts(req, res) {
    const { email } = req.params;
    const getUsersAccounts = await UserService.getUsersAccounts(email);

    const data = await statusHelper
      .statusHelper(req,
        res,
        getUsersAccounts.returnStatus,
        getUsersAccounts.returnError,
        getUsersAccounts.returnSuccess);
    return data;
  },

  /**
   * Get specific user
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async getSpecificUser(req, res) {
    const { id } = req.params;
    const getSpecificUser = await UserService
      .getSpecificUser(id, req.authorizedData);

    const data = await statusHelper
      .statusHelper(req,
        res,
        getSpecificUser.returnStatus,
        getSpecificUser.returnError,
        getSpecificUser.returnSuccess);
    return data;
  },

  /**
   * Delete user
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async deleteUser(req, res) {
    const { id } = req.params;
    const deleteUser = await UserService.deleteUser(id, req.authorizedData);

    const data = await statusHelper
      .statusHelper(req,
        res,
        deleteUser.returnStatus,
        deleteUser.returnError,
        deleteUser.returnSuccess);
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
    const createdStaff = await UserService
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

export default UsersController;
