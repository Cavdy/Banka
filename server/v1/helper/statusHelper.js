/* eslint-disable no-else-return */
const statusHelper = {
  /**
   * Return json data base on the status
   * @constructor
   * @param {*} req - passed in req.
   * @param {*} res -passed in res
   * @param {*} status - passed in status
   * @param {*} error - passed in error message
   * @param {*} data - passed in success data
   */
  async statusHelper(req, res, status, error, data) {
    switch (status) {
      case 401: // unauthorized
        res.status(401);
        return res.json({
          status: 401,
          data: error,
        });
      case 409: // conflict
        res.status(409);
        return res.json({
          status: 409,
          data: error,
        });
      case 403: // forbidden
        res.status(403);
        return res.json({
          status: 403,
          data: error,
        });
      case 201: // created
        res.status(201);
        return res.json({
          status: 201,
          data,
        });
      case 200: // success
        res.status(200);
        return res.json({
          status: 200,
          data,
        });
      case 404: // not found
        res.status(404);
        return res.json({
          status: 404,
          data: error,
        });
      case 422: // unprocessable entity
        res.status(422);
        return res.json({
          status: 422,
          data: error,
        });
      default:
        // do nothing
        break;
    }
  },
};

export default statusHelper;
