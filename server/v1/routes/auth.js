import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import AuthController from '../controllers/auth';
import upload from '../helper/uploadImage';

const router = express.Router();

// creating our routes
router.post('/signin', jwtMiddleware.signinJwt, AuthController.loginUser);
router.post('/signup',
  upload.single('avatar'), AuthController.registerUser);
router.post('/reset', AuthController.sendReset);
router.patch('/verify/:secretToken', AuthController.verifyUser);
router.patch('/forgot/:secretToken', AuthController.forgotPassword);

export default router;
