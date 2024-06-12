BEGIN;

\i 'drop_tables.sql';

\i 'create_tables.sql'

INSERT INTO user_info.users DEFAULT VALUES;

INSERT INTO user_info.user_data_account (user_id, username, password)
VALUES (1, 'poemmys', 'pass');

INSERT INTO user_info.user_data_personal(user_id, first_name, last_name)
VALUES (1, 'Jackson', 'Furr');

COMMIT;
