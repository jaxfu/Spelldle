INSERT INTO users.ids
DEFAULT VALUES;
INSERT INTO spells.ids(spell_id)
VALUES (1);
INSERT INTO game_sessions.ids(game_session_id)
VALUES ('TEST_ID');
INSERT INTO guesses.ids(game_session_id, round)
VALUES ('TEST_ID', 1);
INSERT INTO guesses.ids(game_session_id, round)
VALUES ('TEST_ID', 2);
INSERT INTO guesses.ids(game_session_id, round)
VALUES ('TEST_ID', 3);

INSERT INTO spells.categories(spell_id, name, school, casting_time, range, target, duration, level, components, class, effects)
VALUES (1, 'Fireball', 0, 1, 2, 3, 4, '{1, 1}', '{1, 2}', '{3, 4, 5}', '{6, 7, 8, 9}');

INSERT INTO users.data(user_id, username, password, salt, first_name, last_name)
VALUES (1, 'poemmys', 'pass', 'test_salt', 'Jackson', 'Furr');

INSERT INTO game_sessions.data(game_session_id, user_id, spell_id, rounds)
VALUES ('TEST_ID', 1, 1, 3);

-- GUESS 1: ALL INCORRECT
INSERT INTO guesses.categories(game_session_id, round, school, casting_time, range, target, duration, level, components, class, effects)
VALUES ('TEST_ID', 1, 4, 3, 2, 1, 0, '{1, 0}', '{0}', '{1, 2}', '{15, 16, 17}');

INSERT INTO guesses.results(game_session_id, round, school, casting_time, range, target, duration, level, components, class, effects)
VALUES ('TEST_ID', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- GUESS 2: SOME CORRECT
INSERT INTO guesses.categories(game_session_id, round, school, casting_time, range, target, duration, level, components, class, effects)
VALUES ('TEST_ID', 2, 0, 1, 1, 1, 1, '{0, 1}', '{0, 1}', '{3, 7}', '{7, 10, 13, 14}');

INSERT INTO guesses.results(game_session_id, round, school, casting_time, range, target, duration, level, components, class, effects)
VALUES ('TEST_ID', 2, 2, 0, 0, 0, 0, 1, 1, 1, 1);

-- GUESS 3: ALL CORRECT
INSERT INTO guesses.categories(game_session_id, round, school, casting_time, range, target, duration, level, components, class, effects)
VALUES ('TEST_ID', 3, 0, 1, 2, 3, 4, '{1, 1}', '{1, 2}', '{3, 4, 5}', '{6, 7, 8, 9}');

INSERT INTO guesses.results(game_session_id, round, school, casting_time, range, target, duration, level, components, class, effects)
VALUES ('TEST_ID', 3, 2, 2, 2, 2, 2, 2, 2, 2, 2);
