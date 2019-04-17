import jwt from 'jsonwebtoken';
import debug from 'debug';
import dotenv from 'dotenv';
import LoginService from '../services/login';

dotenv.config();

const LoginController = {
  loginUser(req, res) {
    const userData = req.body;
    const loggedUser = LoginService.loginUser(userData);

    return jwt.sign({ loggedUser }, process.env.JWTSECRETKEY, (err, token) => {
      if (err) { debug('jwterror')(err); }
      if (loggedUser[0] === 'Invalid format' || loggedUser[0] === 'incorrect credentials') {
        res.json({
          status: 'error',
          data: 'incorrect data',
        });
      } else {
        res.json({
          status: 'success',
          data: {
            loggedUser,
            token,
          },
        }).status(201);
      }
    });
  },
};

export default LoginController;
