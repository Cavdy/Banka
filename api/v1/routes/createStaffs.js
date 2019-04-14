import express from 'express';
import CreateStaffController from '../controllers/createStaffs';

const router = express.Router();

// creating our routes
router.post('/', CreateStaffController.createStaff);

export default router;
