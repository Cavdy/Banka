import { Pool } from 'pg';
import debug from 'debug';
import dotenv from 'dotenv';
import { parse } from 'pg-connection-string';

dotenv.config();

let conString;

if (process.env.HEROKU_ACCESS === 'heroku_access') {
  conString = parse(process.env.BANKA_DB);
} else {
  conString = parse(process.env.DB_CONFIG);
}

const pool = new Pool(conString);

const dbConnection = {
  async createTable() {
    const users =
      `CREATE TABLE IF NOT EXISTS
      users (
        id SERIAL PRIMARY KEY UNIQUE,
        email VARCHAR(80) UNIQUE,
        firstName VARCHAR(20),
        lastName VARCHAR(20),
        password VARCHAR(80),
        type VARCHAR(10),
        isAdmin BOOLEAN
      )`;
  
    const accounts =
      `CREATE TABLE IF NOT EXISTS
      accounts (
        id SERIAL PRIMARY KEY UNIQUE,
        email VARCHAR(80),
        firstName VARCHAR(20),
        lastName VARCHAR(20),
        accountNumber BIGINT UNIQUE,
        createdOn VARCHAR(40),
        owner INTEGER,
        type VARCHAR(10),
        status VARCHAR(10),
        balance FLOAT
      )`;
  
    const transactions =
      `CREATE TABLE IF NOT EXISTS
      transactions (
        id SERIAL PRIMARY KEY UNIQUE,
        createdOn VARCHAR(40),
        type VARCHAR(10),
        accountNumber BIGINT,
        cashier INTEGER,
        amount FLOAT,
        oldBalance FLOAT,
        newBalance FLOAT
      )`;
  
    try {
      return (async () => {
        const client = await pool.connect();
        try {
          await client.query(users);
          await client.query(accounts);
          await client.query(transactions);
          await client.query('INSERT into users(email, firstName, lastName, password, type, isAdmin) values($1, $2, $3, $4, $5, $6)',
            ['admin@banka.com', 'cavdy', 'admin', process.env.ADMIN_PWD, 'staff', true]);
        } finally {
          client.release();
        }
      })();
    } catch (e) {
      return debug('query')(e.stack);
    }
  },
  async dbConnect(passedQuery, passedData) {
    try {
      return (async () => {
        const client = await pool.connect();
        try {
          return await client.query(passedQuery, passedData);
        } finally {
          client.release();
        }
      })();
    } catch (e) {
      return debug('query')(e.stack);
    }
  },
  async dbTesting(passedQuery) {
    try {
      return (async () => {
        const client = await pool.connect();
        try {
          return await client.query(passedQuery);
        } finally {
          client.release();
        }
      })();
    } catch (e) {
      return debug('query')(e.stack);
    }
  },
};

export default dbConnection;
