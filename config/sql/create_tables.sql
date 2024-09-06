CREATE SCHEMA users;
CREATE SCHEMA spells;
CREATE SCHEMA game_sessions;
CREATE SCHEMA guesses;

CREATE TYPE users.role AS ENUM ('U', 'G', 'A');

CREATE TABLE users.ids
(
    user_id SERIAL PRIMARY KEY
);

CREATE TABLE spells.ids
(
    spell_id SERIAL PRIMARY KEY
);

CREATE TABLE game_sessions.ids
(
  game_session_id UUID PRIMARY KEY
);

CREATE TABLE spells.categories
(
  spell_id SMALLINT PRIMARY KEY REFERENCES spells.ids(spell_id),
  name TEXT UNIQUE,
  school SMALLINT,
  casting_time SMALLINT,
  range SMALLINT,
  target SMALLINT,
  duration SMALLINT,
  components SMALLINT[],
  level SMALLINT[],
  class SMALLINT[],
  effects SMALLINT[]
);

CREATE TABLE game_sessions.data
(
  game_session_id UUID PRIMARY KEY REFERENCES game_sessions.ids(game_session_id),
  user_id INTEGER REFERENCES users.ids(user_id),
  spell_id INTEGER REFERENCES spells.ids(spell_id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP,
  category_rounds SMALLINT,
  spell_rounds SMALLINT
);

CREATE TABLE users.data
(
    user_id    INTEGER PRIMARY KEY UNIQUE REFERENCES users.ids(user_id),
    username   VARCHAR(32) UNIQUE,
    password   TEXT,
    salt       TEXT,
    first_name VARCHAR(32),
    last_name  VARCHAR(32),
    game_session_id UUID REFERENCES game_sessions.ids(game_session_id),
    role users.role DEFAULT 'U'
);

CREATE TABLE guesses.categories
(
  game_session_id UUID REFERENCES game_sessions.ids(game_session_id),
  round SMALLINT,
  school SMALLINT,
  casting_time SMALLINT,
  range SMALLINT,
  target SMALLINT,
  duration SMALLINT,
  level SMALLINT[],
  components SMALLINT[],
  class SMALLINT[],
  effects SMALLINT[],
  PRIMARY KEY(game_session_id, round)
);

CREATE TABLE guesses.results
(
  game_session_id UUID REFERENCES game_sessions.ids(game_session_id),
  round SMALLINT,
  school SMALLINT,
  casting_time SMALLINT,
  range SMALLINT,
  target SMALLINT,
  duration SMALLINT,
  level SMALLINT,
  components SMALLINT,
  class SMALLINT,
  effects SMALLINT,
  PRIMARY KEY(game_session_id, round)
);

CREATE TABLE guesses.spells
(
  game_session_id UUID PRIMARY KEY REFERENCES game_sessions.ids(game_session_id),
  spells SMALLINT[]
);
