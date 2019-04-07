import RegisterService from '../services/register';

const RegisterController = {
  registerUser(req, res) {
    const userData = req.body;
    const createdUser = RegisterService.registerUser(userData);
    return res.json({
      status: 'success',
      data: createdUser,
    }).status(201);
  },
};

export default RegisterController;
