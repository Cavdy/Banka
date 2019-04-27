import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import UsersController from '../controllers/users';

const router = express.Router();

// creating our routes
router.get('/', jwtMiddleware.verifyJwt, UsersController.getAllUsers);
router.get('/:email/accounts',
  jwtMiddleware.verifyJwt,
  UsersController.getUsersAccounts);
router.delete('/:id', jwtMiddleware.verifyJwt, UsersController.deleteUser);
router.post('/addstaff',
  jwtMiddleware.checkToken,
  jwtMiddleware.signinJwt,
  jwtMiddleware.verifyJwt,
  UsersController.createStaffs);

export default router;
