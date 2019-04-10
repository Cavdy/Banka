import CreateAccountService from '../services/createAccount';

const CreateAccountController = {
  createAccount(req, res) {
    const accountData = req.body;
    const createdAccount = CreateAccountService.createAccount(accountData);
    return res.json({
      status: 'success',
      data: createdAccount,
    }).status(201);
  },
};

export default CreateAccountController;
