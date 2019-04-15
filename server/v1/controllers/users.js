import UserService from '../services/users';

const UsersController = {
  getAllUsers(req, res) {
    const allUsers = UserService.getAllUsers(req.authorizedData);
    return res.json({
      status: 'success',
      data: allUsers,
    }).status(201);
  },

  deleteUser(req, res) {
    const { id } = req.params;
    const deleteUser = UserService.deleteUser(id, req.authorizedData);
    return res.json({
      status: 'success',
      data: deleteUser,
    }).status(201);
  },
};

export default UsersController;
