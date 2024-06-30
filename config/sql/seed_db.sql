INSERT INTO users.ids DEFAULT VALUES;
INSERT INTO spells.ids(spell_id) VALUES (1);
INSERT INTO game_sessions.ids DEFAULT VALUES;

INSERT INTO spells.categories(spell_id, name, school, casting_time, range, target, duration, components, class, effects)
VALUES (1, 'Fireball', 0, 0, 0, 0, 0, '{0, 1}', '{1, 2}', '{3, 4}');

INSERT INTO spells.level_objects(spell_id, level, is_ritual)
VALUES (1, 1, false);

INSERT INTO users.data(user_id, username, password, first_name, last_name, current_session)
VALUES (1, 'poemmys', 'pass', 'Jackson', 'Furr', 1);

INSERT INTO game_sessions.data(game_session_id, user_id, spell_id, rounds)
VALUES (1, 1, 1, 2);

INSERT INTO guesses.categories(game_session_id, round, school, casting_time, range, target, duration, components, class, effects)
VALUES (1, 1, 1, 0, 0, 0, 0, '{0, 1}', '{1, 2}', '{3, 4}');

INSERT INTO guesses.level_objects(game_session_id, round, level, is_ritual)
VALUES (1, 1, 1, false);

INSERT INTO guesses.results(game_session_id, round, school, casting_time, range, target, duration, level, components, class, effects)
VALUES (1, 1, 0, 2, 2, 2, 2, 2, 2, 2, 2);
