import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import LoginController from '../controllers/login';

const router = express.Router();

// creating our routes
router.post('/', jwtMiddleware.signinJwt, LoginController.loginUser);

export default router;
