import UserService from '../services/users';

const UsersController = {
  async getAllUsers(req, res) {
    const allUsers = await UserService.getAllUsers(req.authorizedData);
    return res.json({
      status: 'success',
      data: allUsers,
    }).status(201);
  },

  async getUsersAccounts(req, res) {
    const { email } = req.params;
    const getUsersAccounts = await UserService.getUsersAccounts(email);
    return res.json({
      status: 'success',
      data: getUsersAccounts,
    }).status(201);
  },

  async deleteUser(req, res) {
    const { id } = req.params;
    const deleteUser = await UserService.deleteUser(id, req.authorizedData);
    return res.json({
      status: 'success',
      data: deleteUser,
    }).status(201);
  },
};

export default UsersController;
