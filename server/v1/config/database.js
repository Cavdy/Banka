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
  /**
   * Connect to database
   * @constructor
   * @param {*} passedQuery - passed in SQL query.
   * @param {*} passedData -passed in db values
   */
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

  /**
   * Connect to database - For test
   * @constructor
   * @param {*} passedQuery - passed in SQL query.
   */
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
