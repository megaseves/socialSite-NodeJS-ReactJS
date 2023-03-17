DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS friends CASCADE;

CREATE TABLE users (
  user_id serial PRIMARY KEY,
  username VARCHAR (50) NOT NULL,
  password VARCHAR (50) NOT NULL,
  email VARCHAR (255) UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL
);

CREATE TABLE friends (
  id INT GENERATED ALWAYS AS IDENTITY,
  user_id int,
  friend_id int NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_user_id
  FOREIGN KEY (user_id)
  REFERENCES users(user_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

INSERT INTO users (username, password, email, created_on)
    VALUES ('Lufy', 'megaS022', 'megaseves@gmail.com', current_date);
INSERT INTO users (username, password, email, created_on)
    VALUES ('Szalami', 'megaS022', 'szalami@gmail.com', current_date);
INSERT INTO users (username, password, email, created_on)
    VALUES ('Akarmi', 'megaS022', 'akarmi@gmail.com', current_date);
INSERT INTO users (username, password, email, created_on)
    VALUES ('Valami', 'megaS022', 'valami@gmail.com', current_date);

INSERT INTO friends (user_id, friend_id)
    VALUES  (1, 3);