import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import AuthController from '../controllers/auth';

const router = express.Router();

// creating our routes
router.post('/signin', jwtMiddleware.signinJwt, AuthController.loginUser);
router.post('/signup', jwtMiddleware.signinJwt, AuthController.registerUser);
router.post('/signup/addstaff', jwtMiddleware.checkToken, jwtMiddleware.signinJwt, jwtMiddleware.verifyJwt, AuthController.createStaffs);

export default router;
