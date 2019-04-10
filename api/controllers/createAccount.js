import jwt from 'jsonwebtoken';
import CreateAccountService from '../services/createAccount';

const CreateAccountController = {
  createAccount(req, res) {
    const accountData = req.body;
    jwt.verify(req.token, '5634', (err, authorizedData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const createdAccount = CreateAccountService.createAccount(accountData, authorizedData);
        return res.json({
          status: 'success',
          data: createdAccount,
        }).status(201);
      }
    });
  },
};

export default CreateAccountController;
