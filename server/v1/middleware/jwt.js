import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtMiddleware = {
  checkToken(req, res, next) {
    const header = req.headers.authorization;
    if (typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];
      req.token = token;
      next();
    } else {
      // If header is undefined return Forbidden (403)
      res.sendStatus(403);
    }
  },
  signinJwt(req, res, next) {
    jwt.sign(req.body, process.env.JWTSECRETKEY, async (err, token) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.signintoken = token;
      return next();
    });
  },
  verifyJwt(req, res, next) {
    jwt.verify(req.token, process.env.JWTSECRETKEY, (err, authorizedData) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.authorizedData = authorizedData;
      return next();
    });
  },
};

export default jwtMiddleware;
