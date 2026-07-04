CREATE DATABASE IF NOT EXISTS prefhearable;

CREATE TABLE participants (
  id CHAR(36) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE device_information (
  id INT AUTO_INCREMENT PRIMARY KEY,
  participant_id CHAR(36) NOT NULL,

  operating_system VARCHAR(50),
  model VARCHAR(100),
  audio_device VARCHAR(100),

  FOREIGN KEY (participant_id) REFERENCES participants(id)
);

CREATE TABLE surveys (
  id INT AUTO_INCREMENT PRIMARY KEY,
  participant_id CHAR(36) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  finished_at TIMESTAMP NULL,

  survey_version INT DEFAULT 1,

  FOREIGN KEY (participant_id) REFERENCES participants(id)
);

CREATE TABLE personal_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  survey_id INT NOT NULL UNIQUE,

  age INT,
  gender ENUM('male', 'female', 'diverse'),
  residential_area ENUM('urban', 'suburban', 'rural'),
  occupation VARCHAR(100),
  sport_type VARCHAR(100),
  sport_frequency INT,
  diet ENUM('omnivore', 'vegetarian', 'vegan'),
  allergies TEXT,
  diseases TEXT,
  hearing_aid ENUM('none', 'left', 'right', 'both'),
  hearing_aid_since DATE,

  FOREIGN KEY (survey_id) REFERENCES surveys(id)
);

CREATE TABLE context_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  survey_id INT NOT NULL UNIQUE,

  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  location_type ENUM('indoor', 'outdoor'),
  climate_zone VARCHAR(50),
  season ENUM('spring', 'summer', 'autumn', 'winter'),
  noise_level DECIMAL(5,2),
  time_of_day TIME,
  weather VARCHAR(50),

  FOREIGN KEY (survey_id) REFERENCES surveys(id)
);

CREATE TABLE ccsm_audiotest_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  survey_id INT NOT NULL,

  stimulus ENUM(
    'barking',
    'lawnmower',
    'church_bells',
    'white_noise',
    'synthetic_1'
  ) NOT NULL,

  loudness INT NOT NULL,
  roughness INT NOT NULL,
  tonality INT NOT NULL,
  annoyance INT NOT NULL,
  sharpness INT NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CHECK (loudness BETWEEN 0 AND 50),
  CHECK (roughness BETWEEN 0 AND 50),
  CHECK (tonality BETWEEN 0 AND 50),
  CHECK (annoyance BETWEEN 0 AND 50),
  CHECK (sharpness BETWEEN 0 AND 50),

  FOREIGN KEY (survey_id) REFERENCES surveys(id),

  UNIQUE (survey_id, stimulus)
);

CREATE TABLE eq5d5l_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  survey_id INT NOT NULL UNIQUE,

  mobility INT NOT NULL,
  self_care INT NOT NULL,
  usual_activities INT NOT NULL,
  pain INT NOT NULL,
  anxiety INT NOT NULL,

  CHECK (mobility BETWEEN 1 AND 5),
  CHECK (self_care BETWEEN 1 AND 5),
  CHECK (usual_activities BETWEEN 1 AND 5),
  CHECK (pain BETWEEN 1 AND 5),
  CHECK (anxiety BETWEEN 1 AND 5),

  FOREIGN KEY (survey_id) REFERENCES surveys(id)
);

CREATE TABLE who5_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  survey_id INT NOT NULL UNIQUE,

  positive_affect INT NOT NULL,
  calmness INT NOT NULL,
  vitality INT NOT NULL,
  restedness INT NOT NULL,
  life_interest  INT NOT NULL,

  CHECK (positive_affect BETWEEN 0 AND 5),
  CHECK (calmness BETWEEN 0 AND 5),
  CHECK (vitality BETWEEN 0 AND 5),
  CHECK (restedness BETWEEN 0 AND 5),
  CHECK (life_interest BETWEEN 0 AND 5),

  FOREIGN KEY (survey_id) REFERENCES surveys(id)
);
