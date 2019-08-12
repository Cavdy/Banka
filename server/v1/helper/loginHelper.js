import Validator from 'validator';
import isEmpty from './isEmpty';

const validateInput = {
  validateInput(data) {
    const errors = {};

    // check if empty with our function
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // Validate email field
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Invalid email address';
    }
    if (Validator.isEmpty(data.email)) {
      errors.email = 'Email is required';
    }

    // Validate password field
    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
      errors.password = 'Password must be between 8 and 30 characters';
    }
    if (Validator.isEmpty(data.password)) {
      errors.password = 'Password is required';
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
  }
};

export default validateInput;
