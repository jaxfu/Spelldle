CREATE SCHEMA user_info;
CREATE SCHEMA spell_info;

CREATE TABLE user_info.users
(
    user_id SERIAL PRIMARY KEY
);

CREATE TABLE user_info.user_data_account
(
    user_id    INTEGER PRIMARY KEY UNIQUE REFERENCES user_info.users(user_id),
    username   VARCHAR(32) UNIQUE,
    password   VARCHAR(32)
);

CREATE TABLE user_info.user_data_personal
(
    user_id    INTEGER PRIMARY KEY UNIQUE REFERENCES user_info.users(user_id),
    first_name VARCHAR(32),
    last_name  VARCHAR(32)
);

CREATE TABLE spell_info.spells
(
  spell_id INTEGER PRIMARY KEY UNIQUE,
  name TEXT UNIQUE,
  school INTEGER,
  casting_time INTEGER,
  range INTEGER,
  target INTEGER,
  duration INTEGER,
  components INTEGER[],
  class INTEGER[],
  effects INTEGER[]
);

CREATE TABLE spell_info.spell_level_objects
(
  spell_id INTEGER PRIMARY KEY UNIQUE references spell_info.spells(spell_id),
  level INTEGER,
  is_ritual BOOLEAN
);

CREATE TABLE user_info.current_game_data
(
  user_id    INTEGER PRIMARY KEY UNIQUE REFERENCES user_info.users(user_id),
  current_spell INTEGER UNIQUE REFERENCES spell_info.spells(spell_id)
);
