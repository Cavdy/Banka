import express from 'express';
import CreateAccountController from '../controllers/createAccount';

const router = express.Router();

// creating our routes
router.post('/', CreateAccountController.createAccount);
router.patch('/:accountNumber', CreateAccountController.patchAccount);
router.delete('/:accountNumber', CreateAccountController.deleteAccount);

export default router;
