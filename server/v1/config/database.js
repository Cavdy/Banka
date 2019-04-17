import { Client } from 'pg';
import debug from 'debug';
import dotenv from 'dotenv';

dotenv.config();

const conString = process.env.DB_CONFIG;

const client = new Client(conString);

client.connect((err) => {
  if (err) {
    return debug('connecterror')('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', (error, result) => {
    if (error) {
      return debug('queryerror')('error running query', err);
    }
    debug('querysuccess')(result.rows[0].theTime);
    client.end();
  });
});
