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
  user_id int NOT NULL,
  friend_id int NOT NULL,
  CONSTRAINT fk_user_id
  FOREIGN KEY (user_id)
  REFERENCES users(user_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

INSERT INTO users (username, password, email, avatar, created_on)
    VALUES ('Schmiedt Attila', '$2b$10$zBer8sfm1fvsdIyavx0K3OOPaF3w.ty7m0aq.mBouC12lvZF.chuy', 'megaseves@gmail.com', 'myface.jpg', current_date);
INSERT INTO users (username, password, email, avatar, created_on)
    VALUES ('Polyák Lilla', '$2b$10$zBer8sfm1fvsdIyavx0K3OOPaF3w.ty7m0aq.mBouC12lvZF.chuy', 'polyak.lilla222@gmail.com', 'polyakLilla.jpg', current_date);
INSERT INTO users (username, password, email, avatar, created_on)
    VALUES ('Gubik Petra', '$2b$10$zBer8sfm1fvsdIyavx0K3OOPaF3w.ty7m0aq.mBouC12lvZF.chuy', 'gubik.petra25@gmail.com', 'gubikPetra.jpg', current_date);
INSERT INTO users (username, password, email, avatar, created_on)
    VALUES ('Miklósa Erika', '$2b$10$zBer8sfm1fvsdIyavx0K3OOPaF3w.ty7m0aq.mBouC12lvZF.chuy', 'miklosa.erika19@gmail.com', 'miklosaErika.jpg', current_date);
INSERT INTO users (username, password, email, avatar, created_on)
    VALUES ('Kovács Gyopár', '$2b$10$zBer8sfm1fvsdIyavx0K3OOPaF3w.ty7m0aq.mBouC12lvZF.chuy', 'kovacs.gyopar@gmail.com', 'kovacsGyopar.jpg', current_date);
INSERT INTO users (username, password, email, avatar, created_on)
    VALUES ('Janza Kata', '$2b$10$zBer8sfm1fvsdIyavx0K3OOPaF3w.ty7m0aq.mBouC12lvZF.chuy', 'janza.kata88@gmail.com', 'janzaKata.jpg', current_date);
INSERT INTO users (username, password, email, avatar, created_on)
    VALUES ('Dolhai Attila', '$2b$10$zBer8sfm1fvsdIyavx0K3OOPaF3w.ty7m0aq.mBouC12lvZF.chuy', 'dolhai.attila794@gmail.com', 'dolhaiAttila.jpg', current_date);
INSERT INTO users (username, password, email, avatar, created_on)
    VALUES ('Szabó P. Szilveszter', '$2b$10$zBer8sfm1fvsdIyavx0K3OOPaF3w.ty7m0aq.mBouC12lvZF.chuy', 'szilveszter7495@gmail.com', 'szaboPSzilveszter.jpg', current_date);

INSERT INTO friends (user_id, friend_id)
    VALUES  (7, 1);


INSERT INTO friends (user_id, friend_id)
    VALUES  (8, 1);
INSERT INTO friends (user_id, friend_id)
    VALUES  (1, 8);



INSERT INTO friends (user_id, friend_id)
    VALUES  (8, 2);


INSERT INTO friends (user_id, friend_id)
    VALUES  (1, 2);
INSERT INTO friends (user_id, friend_id)
    VALUES  (2, 1);

INSERT INTO friends (user_id, friend_id)
    VALUES  (1, 4);
INSERT INTO friends (user_id, friend_id)
    VALUES  (4, 1);


INSERT INTO friends (user_id, friend_id)
    VALUES  (1, 3);
INSERT INTO friends (user_id, friend_id)
    VALUES  (1, 5);


INSERT INTO friends (user_id, friend_id)
    VALUES  (2, 5);


