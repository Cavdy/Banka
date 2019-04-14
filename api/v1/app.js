import express from 'express';
import bodyParser from 'body-parser';
import debug from 'debug';
import RegisterRoute from './routes/register';
import CreateStaffRoute from './routes/createStaffs';
import LoginRoute from './routes/login';
import CreateAccountRoute from './routes/createAccount';
import TransactionRoute from './routes/transaction';

// instantiate expressjs
const app = express();
const PORT = process.env.PORT || 5100;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Index Route
app.get('/', (req, res) => {
  res.send('welcome to Banka API');
});

const checkToken = (req, res, next) => {
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
};

// creating the api version route
app.use('/api/auth/signup', RegisterRoute);
app.use('/api/auth/signin', LoginRoute);
app.use('/api/auth/addstaff', checkToken, CreateStaffRoute);
app.use('/api/v1/accounts', checkToken, CreateAccountRoute);
app.use('/api/v1/transactions', checkToken, TransactionRoute);

// listening to our port
app.listen(PORT, () => {
  debug('server')(`server running on port: ${PORT}`);
});

export default app;
