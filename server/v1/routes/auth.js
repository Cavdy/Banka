import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import AuthController from '../controllers/auth';

const router = express.Router();

// creating our routes
router.post('/signin', jwtMiddleware.signinJwt, AuthController.loginUser);
router.post('/signup', jwtMiddleware.signinJwt, AuthController.registerUser);
router.post('/reset', AuthController.sendReset);
router.patch('/verify/:secretToken', AuthController.verifyUser);
router.patch('/forgot/:secretToken', AuthController.forgotPassword);

export default router;
