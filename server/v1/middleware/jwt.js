import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import statusHelper from '../helper/statusHelper';

dotenv.config();

const jwtMiddleware = {
  /**
   * Check Token
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   * @param {*} next - run next
   */
  checkToken(req, res, next) {
    const header = req.headers.authorization;
    if (typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];
      req.token = token;
      next();
    } else {
      // If header is undefined return Forbidden (403)
      return statusHelper
        .statusHelper(req,
          res,
          403,
          'you are not logged in',
          '');
    }
  },

  /**
   * Signin Jwt
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   * @param {*} next - run next
   */
  signinJwt(req, res, next) {
    jwt.sign(req.body, process.env.JWTSECRETKEY, async (err, token) => {
      if (err) {
        return statusHelper
          .statusHelper(req,
            res,
            403,
            'you are not logged in',
            '');
      }
      req.signintoken = token;
      return next();
    });
  },

  /**
   * Verify Jwt
   * @constructor
   * @param {*} req - get request.
   * @param {*} res -get response
   * @param {*} next - run next
   */
  verifyJwt(req, res, next) {
    jwt.verify(req.token, process.env.JWTSECRETKEY, (err, authorizedData) => {
      if (err) {
        return statusHelper
          .statusHelper(req,
            res,
            403,
            'invalid token',
            '');
      }
      req.authorizedData = authorizedData;
      return next();
    });
  },
};

export default jwtMiddleware;
