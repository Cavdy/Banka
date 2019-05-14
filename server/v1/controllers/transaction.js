import TransactionService from '../services/transaction';
import statusHelper from '../helper/statusHelper';

const TransactionController = {
  /**
   * Get All Transactions
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async getAllTransactions(req, res) {
    const queryLimit = req.query.limit;
    const getTransactions = await TransactionService
      .getAllTransactions(req.authorizedData, queryLimit);

    const data = await statusHelper
      .statusHelper(req,
        res,
        getTransactions.returnStatus,
        getTransactions.returnError,
        getTransactions.returnSuccess);
    return data;
  },

  /**
   * Debit Account
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async debitTransaction(req, res) {
    const { accountNumber } = req.params;
    const transactionData = req.body;
    const debitedData = await TransactionService
      .debitTransaction(accountNumber, req.authorizedData, transactionData);

    const data = await statusHelper
      .statusHelper(req,
        res,
        debitedData.returnStatus,
        debitedData.returnError,
        debitedData.returnSuccess);
    return data;
  },

  /**
   * Get specific transaction
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async getSpecificTransaction(req, res) {
    const { transactionid } = req.params;
    const getTransaction = await TransactionService
      .getSpecificTransaction(transactionid);

    const data = await statusHelper
      .statusHelper(req,
        res,
        getTransaction.returnStatus,
        getTransaction.returnError,
        getTransaction.returnSuccess);
    return data;
  },

  /**
   * Credit Account
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async creditTransaction(req, res) {
    const { accountNumber } = req.params;
    const transactionData = req.body;
    const creditedData = await TransactionService
      .creditTransaction(accountNumber, req.authorizedData, transactionData);

    const data = await statusHelper
      .statusHelper(req,
        res,
        creditedData.returnStatus,
        creditedData.returnError,
        creditedData.returnSuccess);
    return data;
  },
};

export default TransactionController;
