/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import TransactionService from '../services/transaction';

const TransactionController = {
  debitTransaction(req, res) {
    const { accountNumber } = req.params;
    const transactionData = req.body;
    // verify jwt token
    jwt.verify(req.token, '5634', (err, authorizedData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const debitedData = TransactionService
          .debitTransaction(accountNumber, authorizedData, transactionData);
        return res.json({
          status: 'success',
          data: debitedData,
        }).status(201);
      }
    });
  },
  creditTransaction(req, res) {
    const { accountNumber } = req.params;
    const transactionData = req.body;
    // verify jwt token
    jwt.verify(req.token, '5634', (err, authorizedData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const creditedData = TransactionService
          .creditTransaction(accountNumber, authorizedData, transactionData);
        return res.json({
          status: 'success',
          data: creditedData,
        }).status(201);
      }
    });
  },
};

export default TransactionController;
