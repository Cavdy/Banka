import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import UsersController from '../controllers/users';

const router = express.Router();

// creating our routes
router.get('/', jwtMiddleware.verifyJwt, UsersController.getAllUsers);
router.delete('/:id', jwtMiddleware.verifyJwt, UsersController.deleteUser);

export default router;
