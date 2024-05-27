BEGIN;

DROP TABLE IF EXISTS user_session_data;
DROP TABLE IF EXISTS user_account_info;

CREATE TABLE user_account_info
(
    user_id    SERIAL PRIMARY KEY,
    username   VARCHAR(32) UNIQUE,
    password   VARCHAR(32),
    first_name VARCHAR(32),
    last_name  VARCHAR(32)
);

CREATE TABLE user_session_data
(
    user_id     INTEGER PRIMARY KEY,
    session_key VARCHAR(36),
    expires     BIGINT,
    CONSTRAINT fk_user_id
        FOREIGN KEY (user_id)
            REFERENCES user_account_info (user_id)
);

INSERT INTO user_account_info (username, password, first_name, last_name)
VALUES ('Poemmys', 'password', 'Jackson', 'Furr');

INSERT INTO user_session_data (user_id, session_key, expires)
VALUES (1, 'TEST_UUID', 1706245738);

COMMIT;