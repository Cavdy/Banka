import { Client } from 'pg';
import debug from 'debug';

const conString = 'postgres://xwrxubeu:u4wOQ6oxpvRCK6yWk5qK4rzaiisTPeoN@isilo.db.elephantsql.com:5432/xwrxubeu';

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
