import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import debug from 'debug';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger';
import RegisterRoute from './routes/register';
import CreateStaffRoute from './routes/createStaffs';
import LoginRoute from './routes/login';
import CreateAccountRoute from './routes/createAccount';
import TransactionRoute from './routes/transaction';
import UsersRoute from './routes/users';
import jwtMiddleware from './middleware/jwt';

// instantiate expressjs
const app = express();
const PORT = process.env.PORT || 5100;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Index Route
app.get('/', (req, res) => {
  res.send('welcome to Banka API');
});

// creating the api version route
app.use('/api/auth/signup', RegisterRoute);
app.use('/api/auth/signin', LoginRoute);
app.use('/api/auth/addstaff', jwtMiddleware.checkToken, CreateStaffRoute);
app.use('/api/v1/accounts', jwtMiddleware.checkToken, CreateAccountRoute);
app.use('/api/v1/transactions', jwtMiddleware.checkToken, TransactionRoute);
app.use('/api/v1/users', jwtMiddleware.checkToken, UsersRoute);

// listening to our port
app.listen(PORT, () => {
  debug('server')(`server running on port: ${PORT}`);
});

export default app;
