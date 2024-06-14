INSERT INTO user_info.users DEFAULT VALUES;

INSERT INTO user_info.user_data_account(user_id, username, password)
VALUES (1, 'poemmys', 'pass');

INSERT INTO user_info.user_data_personal(user_id, first_name, last_name)
VALUES (1, 'Jackson', 'Furr');

INSERT INTO spell_info.spells(spell_id, name, school, casting_time, range, target, duration, components, class, effects)
VALUES (0, 'Fireball', 0, 0, 0, 0, 0, '{0, 1}', '{1, 2}', '{3, 4}');

INSERT INTO spell_info.spell_level_objects(spell_id, level, is_ritual)
VALUES (0, 1, false);
