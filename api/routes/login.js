import express from 'express';
import LoginController from '../controllers/login';

const router = express.Router();

// creating our routes
router.post('/', LoginController.loginUser);

export default router;
