import 'dotenv/config';
import data from './dummyJson/users';
import data2 from './dummyJson/accounts';
import data3 from './dummyJson/transactions';

// console.log('Hello Node.js project.');

// console.log(process.env.MY_SECRET);

const { users } = data;
const { accounts } = data2;
const { transactions } = data3;

users.map(user => console.log(user.firstName));

accounts.map(account => console.log(account.accountNumber));

transactions.map(transaction => console.log(transaction.newBalance));
