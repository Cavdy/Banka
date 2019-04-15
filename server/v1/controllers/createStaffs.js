import CreateStaffService from '../services/createStaffs';

const CreateStaffController = {
  createStaff(req, res) {
    const userData = req.body;
    // eslint-disable-next-line no-unused-expressions
    const createdStaff = CreateStaffService
      .createStaffUser(userData, req.authorizedData);
    return res.json({
      status: 'success',
      data: createdStaff,
    }).status(201);
  },
};

export default CreateStaffController;
