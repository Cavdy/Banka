import jwt from 'jsonwebtoken';
import CreateAccountService from '../services/createAccount';

const CreateAccountController = {
  createAccount(req, res) {
    const accountData = req.body;
    // verify jwt token
    jwt.verify(req.token, '5634', (err, authorizedData) => {
      if (err) {
        return res.json({
          status: 403,
          data: 'You must be logged in to create an account',
        }).status(403);
      }
      const createdAccount = CreateAccountService.createAccount(accountData, authorizedData);
      return res.json({
        status: 'success',
        data: createdAccount,
      }).status(201);
    });
  },
  // patchAccount
  patchAccount(req, res) {
    const { accountNumber } = req.params;
    const accountStatus = req.body;
    jwt.verify(req.token, '5634', (err, authorizedData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const updatedAccount = CreateAccountService.patchAccount(accountNumber, accountStatus, authorizedData);
        return res.json({
          status: 'success',
          data: updatedAccount,
        }).status(201);
      }
    });
  },
  // deleteAccount
  deleteAccount(req, res) {
    const { accountNumber } = req.params;
    jwt.verify(req.token, '5634', (err, authorizedData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const deleteAccount = CreateAccountService.deleteAccount(accountNumber, authorizedData);
        return res.json({
          status: 'success',
          data: deleteAccount,
        }).status(200);
      }
    });
  },
};

export default CreateAccountController;
