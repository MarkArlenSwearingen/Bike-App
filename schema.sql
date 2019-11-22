DROP TABLE IF EXISTS bikeshops;

CREATE TABLE bikeshops (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  longitude NUMBER (12,7),
  latitude NUMBER (12,7),
  query VARCHAR(255)
);
