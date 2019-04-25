import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import AccountsController from '../controllers/accounts';

const router = express.Router();

// creating our routes
router.get('/', jwtMiddleware.verifyJwt, AccountsController.allAccounts);
router.get('/:accountNumber',
  jwtMiddleware.verifyJwt,
  AccountsController.specificAccounts);
router.get('/:accountNumber/transactions',
  jwtMiddleware.verifyJwt,
  AccountsController.allAccountTransaction);
router.post('/',
  jwtMiddleware.verifyJwt,
  AccountsController.createAccount);
router.patch('/:accountNumber',
  jwtMiddleware.verifyJwt,
  AccountsController.patchAccount);
router.delete('/:accountNumber',
  jwtMiddleware.verifyJwt,
  AccountsController.deleteAccount);

export default router;
