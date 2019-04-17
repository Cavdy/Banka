import { Pool } from 'pg';
import debug from 'debug';
import dotenv from 'dotenv';
import { parse } from 'pg-connection-string';

dotenv.config();

const conString = parse(process.env.DB_CONFIG);

const pool = new Pool(conString);

const dbConnection = {
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
