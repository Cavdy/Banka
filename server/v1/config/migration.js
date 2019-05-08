import dotenv from 'dotenv';
import dbConnection from './database';

dotenv.config();

const Migration = {
  /**
   * Migration
   * @constructor
   */
  async createTable() {
    const users = `
    CREATE TABLE IF NOT EXISTS
      users (
        id SERIAL PRIMARY KEY UNIQUE,
        email VARCHAR(80) UNIQUE,
        firstName VARCHAR(20),
        lastName VARCHAR(20),
        password VARCHAR(80),
        type VARCHAR(10),
        isAdmin BOOLEAN,
        verify BOOLEAN,
        secretToken VARCHAR(40)
      )`;

    const accounts = `
    CREATE TABLE IF NOT EXISTS
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

    const transactions = `
    CREATE TABLE IF NOT EXISTS
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

    await dbConnection.dbConnect(users);
    await dbConnection.dbConnect(accounts);
    await dbConnection.dbConnect(transactions);
    await dbConnection
      .dbConnect('INSERT into users(email, firstName, lastName, password, type, isAdmin, verify, secretToken) values($1, $2, $3, $4, $5, $6, $7, $8)',
        ['admin@banka.com', 'cavdy', 'admin', process.env.ADMIN_PWD, 'client', true, true, '']);
  },
};

export default Migration;
