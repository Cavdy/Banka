import LoginService from '../services/login';

const LoginController = {
  loginUser(req, res) {
    const userData = req.body;
    const loggedUser = LoginService.loginUser(userData);
    return res.json({
      status: 'success',
      data: loggedUser,
    }).status(201);
  },
};

export default LoginController;
