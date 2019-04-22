import CreateAccountService from '../services/createAccount';
import statusHelper from '../helper/statusHelper';

const CreateAccountController = {
  async createAccount(req, res) {
    const accountData = req.body;
    const createdAccount = await CreateAccountService
      .createAccount(accountData, req.authorizedData);

    const data = await statusHelper
      .statusHelper('nothing', res, createdAccount.returnStatus, createdAccount.returnError, createdAccount.returnSuccess);
    return data;
  },

  // all accounts
  async allAccounts(req, res) {
    const queryParams = req.query.status;
    const queryLimit = req.query.limit;
    const allAccounts = await CreateAccountService
      .allAccounts(queryParams, queryLimit, req.authorizedData);

    const data = await statusHelper
      .statusHelper('nothing', res, allAccounts.returnStatus, allAccounts.returnError, allAccounts.returnSuccess);
    return data;
  },

  // specific account
  async specificAccounts(req, res) {
    const { accountNumber } = req.params;
    const specificAccounts = await CreateAccountService
      .specificAccounts(accountNumber);

    const data = await statusHelper
      .statusHelper('nothing', res, specificAccounts.returnStatus, specificAccounts.returnError, specificAccounts.returnSuccess);
    return data;
  },

  // get transaction history
  async allAccountTransaction(req, res) {
    const { accountNumber } = req.params;
    const transactionHistory = await CreateAccountService
      .allAccountTransaction(accountNumber);

    const data = await statusHelper
      .statusHelper('nothing', res, transactionHistory.returnStatus, transactionHistory.returnError, transactionHistory.returnSuccess);
    return data;
  },

  // patchAccount
  async patchAccount(req, res) {
    const { accountNumber } = req.params;
    const accountStatus = req.body;
    const updatedAccount = await CreateAccountService
      .patchAccount(accountNumber, accountStatus, req.authorizedData);

    const data = await statusHelper
      .statusHelper('nothing', res, updatedAccount.returnStatus, updatedAccount.returnError, updatedAccount.returnSuccess);
    return data;
  },

  // deleteAccount
  async deleteAccount(req, res) {
    const { accountNumber } = req.params;
    const deleteAccount = await CreateAccountService
      .deleteAccount(accountNumber, req.authorizedData);

    const data = await statusHelper
      .statusHelper('nothing', res, deleteAccount.returnStatus, deleteAccount.returnError, deleteAccount.returnSuccess);
    return data;
  },
};

export default CreateAccountController;
