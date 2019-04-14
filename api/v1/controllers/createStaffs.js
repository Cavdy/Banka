import jwt from 'jsonwebtoken';
import CreateStaffService from '../services/createStaffs';

const CreateStaffController = {
  createStaff(req, res) {
    const userData = req.body;
    // eslint-disable-next-line no-unused-expressions
    jwt.verify(req.token, '5634', (err, authorizedData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const createdStaff = CreateStaffService
          .createStaffUser(userData, authorizedData);
        return res.json({
          status: 'success',
          data: createdStaff,
        }).status(201);
      }
    });
  },
};

export default CreateStaffController;
