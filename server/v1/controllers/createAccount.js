import CreateAccountService from '../services/createAccount';

const CreateAccountController = {
  async createAccount(req, res) {
    const accountData = req.body;
    const createdAccount = await CreateAccountService
      .createAccount(accountData, req.authorizedData);
    return res.json({
      status: 'success',
      data: createdAccount,
    }).status(201);
  },

  // all accounts
  async allAccounts(req, res) {
    const queryParams = req.query.status;
    const allAccounts = await CreateAccountService
      .allAccounts(queryParams);
    return res.json({
      status: 'success',
      data: allAccounts,
    }).status(201);
  },

  // get transaction history
  async allAccountTransaction(req, res) {
    const { accountNumber } = req.params;
    const transactionHistory = await CreateAccountService
      .allAccountTransaction(accountNumber);
    return res.json({
      status: 'success',
      data: transactionHistory,
    }).status(201);
  },

  // patchAccount
  async patchAccount(req, res) {
    const { accountNumber } = req.params;
    const accountStatus = req.body;
    const updatedAccount = await CreateAccountService
      .patchAccount(accountNumber, accountStatus, req.authorizedData);
    return res.json({
      status: 'success',
      data: updatedAccount,
    }).status(201);
  },

  // deleteAccount
  async deleteAccount(req, res) {
    const { accountNumber } = req.params;
    const deleteAccount = await CreateAccountService
      .deleteAccount(accountNumber, req.authorizedData);
    return res.json({
      status: 'success',
      data: deleteAccount,
    }).status(200);
  },
};

export default CreateAccountController;
