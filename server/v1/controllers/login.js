import LoginService from '../services/login';

const LoginController = {
  async loginUser(req, res) {
    const userData = req.body;

    const loggedUser = await LoginService.loginUser(userData, req.token);
    res.json({
      status: 'success',
      data: loggedUser,
    }).status(201);
  },
};

export default LoginController;
