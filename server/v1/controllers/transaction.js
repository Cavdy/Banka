/* eslint-disable consistent-return */
import TransactionService from '../services/transaction';

const TransactionController = {
  async debitTransaction(req, res) {
    const { accountNumber } = req.params;
    const transactionData = req.body;
    const debitedData = await TransactionService
      .debitTransaction(accountNumber, req.authorizedData, transactionData);
    return res.json({
      status: 'success',
      data: debitedData,
    }).status(201);
  },

  async getSpecificTransaction(req, res) {
    const { transactionid } = req.params;
    const getTransaction = await TransactionService
      .getSpecificTransaction(transactionid);
    return res.json({
      status: 'success',
      data: getTransaction,
    }).status(201);
  },

  async creditTransaction(req, res) {
    const { accountNumber } = req.params;
    const transactionData = req.body;
    const creditedData = await TransactionService
      .creditTransaction(accountNumber, req.authorizedData, transactionData);
    return res.json({
      status: 'success',
      data: creditedData,
    }).status(201);
  },
};

export default TransactionController;
