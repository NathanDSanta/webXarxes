CREATE DATABASE webXarxes;
USE webXarxes;

CREATE TABLE users (
  id integer PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(24) UNIQUE NOT NULL,
  password VARCHAR(24) NOT NULL,
  role VARCHAR(10) NOT NULL
);

INSERT INTO users (username, password, role)
VALUES
('admin1', 'password123', 'admin'),
('admin2', 'password456', 'admin'),
('user1', 'password123', 'user'),
('user2', 'password456', 'user');

CREATE TABLE posts (
  id integer PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(24) NOT NULL,
  content TEXT NOT NULL,
  username VARCHAR(24) NOT NULL,
  FOREIGN KEY (username) REFERENCES users(username)
);

INSERT INTO posts(title, content, username)
VALUES
('Post1', 'some content', 'user1'),
('User 2 post', 'some post 2 content', 'user2'),
('New Post', 'some admin post', 'admin1'),
('Info', 'some text', 'admin2'),
('ChangeLog', 'more text', 'user1'),
('Groups', 'some post 2 content', 'user2'),
('post', 'some admin post', 'admin1'),
('title', 'some text', 'admin2');
