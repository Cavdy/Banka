import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import CreateAccountController from '../controllers/createAccount';

const router = express.Router();

// creating our routes
router.get('/:accountNumber/transactions', jwtMiddleware.verifyJwt, CreateAccountController.allAccountTransaction);
router.post('/', jwtMiddleware.verifyJwt, CreateAccountController.createAccount);
router.patch('/:accountNumber', jwtMiddleware.verifyJwt, CreateAccountController.patchAccount);
router.delete('/:accountNumber', jwtMiddleware.verifyJwt, CreateAccountController.deleteAccount);

export default router;
