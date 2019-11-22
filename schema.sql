DROP TABLE IF EXISTS bikeshops;

CREATE TABLE bikeshops (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  longitude NUMERIC (12,7),
  latitude NUMERIC (12,7),
  query VARCHAR(255)
);
