import UserService from '../services/users';
import statusHelper from '../helper/statusHelper';

const UsersController = {
  async getAllUsers(req, res) {
    const queryLimit = req.query.limit;
    const allUsers = await UserService.getAllUsers(req.authorizedData, queryLimit);

    const data = await statusHelper
      .statusHelper('nothing', res, allUsers.returnStatus, allUsers.returnError, allUsers.returnSuccess);
    return data;
  },

  async getUsersAccounts(req, res) {
    const { email } = req.params;
    const getUsersAccounts = await UserService.getUsersAccounts(email);

    const data = await statusHelper
      .statusHelper('nothing', res, getUsersAccounts.returnStatus, getUsersAccounts.returnError, getUsersAccounts.returnSuccess);
    return data;
  },

  async deleteUser(req, res) {
    const { id } = req.params;
    const deleteUser = await UserService.deleteUser(id, req.authorizedData);

    const data = await statusHelper
      .statusHelper('nothing', res, deleteUser.returnStatus, deleteUser.returnError, deleteUser.returnSuccess);
    return data;
  },
};

export default UsersController;
