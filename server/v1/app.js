import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import debug from 'debug';
import swaggerUi from 'swagger-ui-express';
import migration from './config/migration';
import swaggerDocument from '../swagger';
import AuthRoute from './routes/auth';
import CreateAccountRoute from './routes/accounts';
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

// creating database tables
migration.createTable();

// Index Route
app.get('/', (req, res) => {
  res.send('welcome to Banka API');
});

// creating the api version route
app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/accounts', jwtMiddleware.checkToken, CreateAccountRoute);
app.use('/api/v1/transactions', jwtMiddleware.checkToken, TransactionRoute);
app.use('/api/v1/users', jwtMiddleware.checkToken, UsersRoute);

// listening to our port
app.listen(PORT, () => {
  debug('server')(`server running on port: ${PORT}`);
});

export default app;
