-- Transactions SQL query

-- create transactions table
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY UNIQUE,
  createdOn VARCHAR(40),
  type VARCHAR(10),
  accountNumber BIGINT,
  cashier INTEGER,
  amount FLOAT,
  oldBalance FLOAT,
  newBalance FLOAT
);

-- select all from transactions table
SELECT * FROM transactions LIMIT 10

-- select account number fro transactions
SELECT accountNumber FROM transactions WHERE accountNumber=$1, ['accountNumber']

-- insert into transactions table
INSERT into transactions values($1), ['value']

-- update
UPDATE transactions SET balance=$1 WHERE accountnumber=$2, [newBalance, accountNumber]

-- delete from transactions table
DELETE FROM transactions;