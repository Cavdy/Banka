/* eslint-disable consistent-return */
import TransactionService from '../services/transaction';
import statusHelper from '../helper/statusHelper';

const TransactionController = {
  async debitTransaction(req, res) {
    const { accountNumber } = req.params;
    const transactionData = req.body;
    const debitedData = await TransactionService
      .debitTransaction(accountNumber, req.authorizedData, transactionData);

    const data = await statusHelper
      .statusHelper('nothing', res, debitedData.returnStatus, debitedData.returnError, debitedData.returnSuccess);
    return data;
  },

  async getSpecificTransaction(req, res) {
    const { transactionid } = req.params;
    const getTransaction = await TransactionService
      .getSpecificTransaction(transactionid);

    const data = await statusHelper
      .statusHelper('nothing', res, getTransaction.returnStatus, getTransaction.returnError, getTransaction.returnSuccess);
    return data;
  },

  async creditTransaction(req, res) {
    const { accountNumber } = req.params;
    const transactionData = req.body;
    const creditedData = await TransactionService
      .creditTransaction(accountNumber, req.authorizedData, transactionData);

    const data = await statusHelper
      .statusHelper('nothing', res, creditedData.returnStatus, creditedData.returnError, creditedData.returnSuccess);
    return data;
  },
};

export default TransactionController;
