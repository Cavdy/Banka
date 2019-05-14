import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import TransactionController from '../controllers/transaction';

const router = express.Router();

// creating our routes
router.get('/',
  jwtMiddleware.verifyJwt,
  TransactionController.getAllTransactions);
router.get('/:transactionid',
  jwtMiddleware.verifyJwt,
  TransactionController.getSpecificTransaction);
router.post('/:accountNumber/debit',
  jwtMiddleware.verifyJwt,
  TransactionController.debitTransaction);
router.post('/:accountNumber/credit',
  jwtMiddleware.verifyJwt,
  TransactionController.creditTransaction);

export default router;
