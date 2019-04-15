import jwt from 'jsonwebtoken';

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
  verifyJwt(req, res, next) {
    jwt.verify(req.token, '5634', (err, authorizedData) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.authorizedData = authorizedData;
      return next();
    });
  },
};

export default jwtMiddleware;
