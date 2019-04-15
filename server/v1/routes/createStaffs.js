import express from 'express';
import jwtMiddleware from '../middleware/jwt';
import CreateStaffController from '../controllers/createStaffs';

const router = express.Router();

// creating our routes
router.post('/', jwtMiddleware.verifyJwt, CreateStaffController.createStaff);

export default router;
