import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import RegisterController from '../controllers/register';

const router = express.Router();

// creating our routes
router.post('/', jwtMiddleware.signinJwt, RegisterController.registerUser);

export default router;
