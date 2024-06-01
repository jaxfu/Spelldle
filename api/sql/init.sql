BEGIN;

DROP TABLE IF EXISTS user_data_account;
DROP TABLE IF EXISTS user_data_personal;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY
);

CREATE TABLE user_data_account
(
    user_id    INTEGER PRIMARY KEY UNIQUE REFERENCES users(user_id),
    username   VARCHAR(32) UNIQUE,
    password   VARCHAR(32)
);

CREATE TABLE user_data_personal
(
    user_id    INTEGER PRIMARY KEY UNIQUE REFERENCES users(user_id),
    first_name VARCHAR(32),
    last_name  VARCHAR(32)
);

INSERT INTO users DEFAULT VALUES ;

INSERT INTO user_data_account (user_id, username, password)
VALUES (1, 'poemmys', 'pass');

INSERT INTO user_data_personal(user_id, first_name, last_name)
VALUES (1, 'Jackson', 'Furr');

COMMIT;