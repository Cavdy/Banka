import RegisterService from '../services/register';

const RegisterController = {
  async registerUser(req, res) {
    const userData = req.body;
    const createdUser = await RegisterService.registerUser(userData);
    return res.json({
      status: 'success',
      data: createdUser,
    }).status(201);
  },
};

export default RegisterController;
