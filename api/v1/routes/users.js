import express from 'express';
import UsersController from '../controllers/users';

const router = express.Router();

// creating our routes
router.get('/', UsersController.getAllUsers);
router.delete('/:id', UsersController.deleteUser);

export default router;
