import { Pool } from 'pg';
import debug from 'debug';
import dotenv from 'dotenv';
import { parse } from 'pg-connection-string';

dotenv.config();

const conString = parse(process.env.DB_CONFIG);

const pool = new Pool(conString);

// async/await - check out a client
(async () => {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT NOW() AS "theTime"');
    debug('query')(res.rows[0].theTime);
  } finally {
    client.release();
  }
})().catch(e => debug('query')(e.stack));
