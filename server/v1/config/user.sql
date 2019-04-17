-- Users SQL query

-- create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY UNIQUE,
  email VARCHAR(80) UNIQUE,
  firstName VARCHAR(20),
  lastName VARCHAR(20),
  password VARCHAR(80),
  type VARCHAR(10),
  isAdmin BOOLEAN
);

-- select all from users table
SELECT * FROM users LIMIT 10

-- select email fro users
SELECT email FROM users WHERE email=$1, ['email']

-- insert into users table
INSERT into users values($1), ['value']

-- delete from users table
DELETE FROM users;

-- admin
INSERT into users(email, firstName, lastName, password, type, isAdmin) values('admin@banka.com', 'cavdy', 'ikenna', '$2a$10$CmmIst1.D3QjaWuafKbBaOuAFu0r9o7xxQY.0SMKiAN.h9z52a2y2', 'staff', true)