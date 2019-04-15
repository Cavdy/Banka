import express from 'express';
import RegisterController from '../controllers/register';

const router = express.Router();

// creating our routes
router.post('/', RegisterController.registerUser);

export default router;
