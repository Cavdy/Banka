import jwt from 'jsonwebtoken';
import UserService from '../services/users';

const UsersController = {
  getAllUsers(req, res) {
    // verify jwt token
    jwt.verify(req.token, '5634', (err, authorizedData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const allUsers = UserService.getAllUsers(authorizedData);
        return res.json({
          status: 'success',
          data: allUsers,
        }).status(201);
      }
    });
  },

  deleteUser(req, res) {
    const { id } = req.params;
    // verify jwt token
    jwt.verify(req.token, '5634', (err, authorizedData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const deleteUser = UserService.deleteUser(id, authorizedData);
        return res.json({
          status: 'success',
          data: deleteUser,
        }).status(201);
      }
    });
  },
};

export default UsersController;
