import express from 'express';
import bodyParser from 'body-parser';
import RegisterRoute from './routes/register';

// instantiate expressjs
const app = express();
const PORT = process.env.PORT || 5100;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('welcome to Banka API');
});

// creating the api version route
app.use('/api/v1/register', RegisterRoute);

// listening to our port
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});

export default app;
