import jwt from 'jsonwebtoken';
import LoginService from '../services/login';

const LoginController = {
  loginUser(req, res) {
    const userData = req.body;
    const loggedUser = LoginService.loginUser(userData);

    return jwt.sign({ loggedUser }, '5634', (err, token) => {
      if (err) { console.log(err); }
      if (loggedUser[0] === 'Invalid format' || loggedUser[0] === 'incorrect credentials') {
        res.json({
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
