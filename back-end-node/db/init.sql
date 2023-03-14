DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id serial PRIMARY KEY,
  username VARCHAR (50) NOT NULL,
  password VARCHAR (50) NOT NULL,
  email VARCHAR (255) UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL
);

INSERT INTO users (username, password, email, created_on)
    VALUES ('Lufy', 'megaS022', 'megaseves@gmail.com', current_date);