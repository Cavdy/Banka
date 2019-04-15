/* eslint-disable consistent-return */
import TransactionService from '../services/transaction';

const TransactionController = {
  debitTransaction(req, res) {
    const { accountNumber } = req.params;
    const transactionData = req.body;
    const debitedData = TransactionService
      .debitTransaction(accountNumber, req.authorizedData, transactionData);
    return res.json({
      status: 'success',
      data: debitedData,
    }).status(201);
  },
  creditTransaction(req, res) {
    const { accountNumber } = req.params;
    const transactionData = req.body;
    const creditedData = TransactionService
      .creditTransaction(accountNumber, req.authorizedData, transactionData);
    return res.json({
      status: 'success',
      data: creditedData,
    }).status(201);
  },
};

export default TransactionController;
