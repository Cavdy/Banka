import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import LoginService from '../services/login';

dotenv.config();

const LoginController = {
  async loginUser(req, res) {
    const userData = req.body;

    jwt.sign({ userData }, process.env.JWTSECRETKEY, async (err, token) => {
      const loggedUser = await LoginService.loginUser(userData, token);
      res.json({
        status: 'success',
        data: loggedUser,
      }).status(201);
    });
  },
};

export default LoginController;
