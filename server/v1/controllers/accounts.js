import AccountsService from '../services/accounts';
import statusHelper from '../helper/statusHelper';

const CreateAccountController = {
  /**
   * Create accounts
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async createAccount(req, res) {
    const accountData = req.body;
    const createdAccount = await AccountsService
      .createAccount(accountData, req.authorizedData);

    const data = await statusHelper
      .statusHelper(req,
        res,
        createdAccount.returnStatus,
        createdAccount.returnError,
        createdAccount.returnSuccess);
    return data;
  },

  /**
   * Get all accounts
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async allAccounts(req, res) {
    const queryParams = req.query.status;
    const queryLimit = req.query.limit;
    const allAccounts = await AccountsService
      .allAccounts(queryParams, queryLimit, req.authorizedData);

    const data = await statusHelper
      .statusHelper(req,
        res,
        allAccounts.returnStatus,
        allAccounts.returnError,
        allAccounts.returnSuccess);
    return data;
  },

  /**
   * Get specific account
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async specificAccounts(req, res) {
    const { accountNumber } = req.params;
    const specificAccounts = await AccountsService
      .specificAccounts(accountNumber);

    const data = await statusHelper
      .statusHelper(req,
        res,
        specificAccounts.returnStatus,
        specificAccounts.returnError,
        specificAccounts.returnSuccess);
    return data;
  },

  /**
   * Get account transactions
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async allAccountTransaction(req, res) {
    const { accountNumber } = req.params;
    const transactionHistory = await AccountsService
      .allAccountTransaction(accountNumber);

    const data = await statusHelper
      .statusHelper(req,
        res,
        transactionHistory.returnStatus,
        transactionHistory.returnError,
        transactionHistory.returnSuccess);
    return data;
  },

  /**
   * Patch account
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async patchAccount(req, res) {
    const { accountNumber } = req.params;
    const accountStatus = req.body;
    const updatedAccount = await AccountsService
      .patchAccount(accountNumber, accountStatus, req.authorizedData);

    const data = await statusHelper
      .statusHelper(req,
        res,
        updatedAccount.returnStatus,
        updatedAccount.returnError,
        updatedAccount.returnSuccess);
    return data;
  },

  /**
   * Delete accounts
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   */
  async deleteAccount(req, res) {
    const { accountNumber } = req.params;
    const deleteAccount = await AccountsService
      .deleteAccount(accountNumber, req.authorizedData);

    const data = await statusHelper
      .statusHelper(req,
        res,
        deleteAccount.returnStatus,
        deleteAccount.returnError,
        deleteAccount.returnSuccess);
    return data;
  },
};

export default CreateAccountController;
