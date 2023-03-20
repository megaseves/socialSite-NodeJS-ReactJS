DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS friends CASCADE;

CREATE TABLE users (
  user_id serial PRIMARY KEY,
  username VARCHAR (50) NOT NULL,
  password TEXT NOT NULL,
  email VARCHAR (255) UNIQUE NOT NULL,
  avatar TEXT,
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

INSERT INTO users (username, password, email, avatar, created_on)
    VALUES ('Lufy', '$2b$10$zBer8sfm1fvsdIyavx0K3OOPaF3w.ty7m0aq.mBouC12lvZF.chuy', 'megaseves@gmail.com', 'defaultAvatar.jpg', current_date);
INSERT INTO users (username, password, email, avatar, created_on)
    VALUES ('Szalami', '$2b$10$zBer8sfm1fvsdIyavx0K3OOPaF3w.ty7m0aq.mBouC12lvZF.chuy', 'szalami@gmail.com', 'defaultAvatar.jpg', current_date);
INSERT INTO users (username, password, email, avatar, created_on)
    VALUES ('Akarmi', '$2b$10$zBer8sfm1fvsdIyavx0K3OOPaF3w.ty7m0aq.mBouC12lvZF.chuy', 'akarmi@gmail.com', 'defaultAvatar.jpg', current_date);
INSERT INTO users (username, password, email, avatar, created_on)
    VALUES ('Valami', '$2b$10$zBer8sfm1fvsdIyavx0K3OOPaF3w.ty7m0aq.mBouC12lvZF.chuy', 'valami@gmail.com', 'defaultAvatar.jpg', current_date);

INSERT INTO friends (user_id, friend_id)
    VALUES  (1, 3);