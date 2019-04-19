-- Accounts SQL query

-- create accounts table
CREATE TABLE accounts (
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
);

-- select all from accounts table
SELECT * FROM accounts LIMIT 10

-- select account number fro accounts
SELECT accountNumber FROM accounts WHERE accountNumber=$1, ['accountNumber']

-- insert into accounts table
INSERT into accounts values($1), ['value']

-- delete from accounts table
DELETE FROM accounts;