import express from 'express';
import TransactionController from '../controllers/transaction';

const router = express.Router();

// creating our routes
router.post('/:accountNumber/debit', TransactionController.debitTransaction);
router.post('/:accountNumber/credit', TransactionController.creditTransaction);

export default router;
