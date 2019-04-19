/* eslint-disable no-else-return */
const statusHelper = {
  async statusHelper(req, res, status, error, data) {
    if (status === 401) { // unauthorized
      res.status(401);
      return res.json({
        status: 401,
        data: error,
      });
    } else if (status === 500) { // internal error
      res.status(500);
      return res.json({
        status: 500,
        data: 'Internal Server Error',
      });
    } else if (status === 409) { // conflict
      res.status(409);
      return res.json({
        status: 409,
        data: error,
      });
    } else if (status === 201) { // created
      res.status(201);
      return res.json({
        status: 201,
        data,
      });
    } else if (status === 200) { // success
      res.status(200);
      return res.json({
        status: 200,
        data,
      });
    } else if (status === 404) { // not found
      res.status(404);
      return res.json({
        status: 404,
        data: error,
      });
    } else if (status === 204) { // no content
      res.status(204);
      return res.json({
        status: 204,
        data: error,
      });
    } else if (status === 422) {
      res.status(422);
      return res.json({ // unprocessable entity
        status: 422,
        data: error,
      });
    }
  },
};

export default statusHelper;
