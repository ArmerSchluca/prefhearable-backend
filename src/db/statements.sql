CREATE DATABASE prefhearable;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  age INT NOT NULL,
  gender ENUM('male','female','diverse') NOT NULL,
  diseases TEXT
);