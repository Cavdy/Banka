import express from 'express';
import CreateAccountController from '../controllers/createAccount';

const router = express.Router();

// creating our routes
router.post('/', CreateAccountController.createAccount);

export default router;
