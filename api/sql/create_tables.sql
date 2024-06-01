BEGIN;

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

COMMIT;