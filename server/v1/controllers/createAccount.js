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
  // patchAccount
  patchAccount(req, res) {
    const { accountNumber } = req.params;
    const accountStatus = req.body;
    const updatedAccount = CreateAccountService
      .patchAccount(accountNumber, accountStatus, req.authorizedData);
    return res.json({
      status: 'success',
      data: updatedAccount,
    }).status(201);
  },
  // deleteAccount
  deleteAccount(req, res) {
    const { accountNumber } = req.params;
    const deleteAccount = CreateAccountService.deleteAccount(accountNumber, req.authorizedData);
    return res.json({
      status: 'success',
      data: deleteAccount,
    }).status(200);
  },
};

export default CreateAccountController;
