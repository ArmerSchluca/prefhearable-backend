CREATE DATABASE IF NOT EXISTS prefhearable;

CREATE TABLE participants (
  id CHAR(36) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE surveys (
  id INT AUTO_INCREMENT PRIMARY KEY,
  participant_id CHAR(36),

  status ENUM('ACTIVE','FINISHED') DEFAULT 'ACTIVE',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  finished_at TIMESTAMP NULL,

  FOREIGN KEY (participant_id) REFERENCES participants(id)
);

CREATE TABLE personal_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  survey_id INT NOT NULL,

  age INT,
  gender ENUM('male', 'female', 'diverse'),
  region ENUM('urban', 'suburban', 'rural'),
  occupation VARCHAR(100),
  sport_type VARCHAR(100),
  sport_frequency INT,
  diet ENUM('vegan', 'vegetarian', 'omnivore'),
  allergies TEXT,
  diseases TEXT,
  hearing_aid ENUM('none', 'left', 'right', 'both'),
  hearing_aid_since DATE,

  FOREIGN KEY (survey_id) REFERENCES surveys(id)
);

CREATE TABLE context_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  survey_id INT NOT NULL,

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

CREATE TABLE eq5d5l_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  survey_id INT NOT NULL,

  mobility INT NOT NULL,
  self_care INT NOT NULL,
  usual_activities INT NOT NULL,
  pain INT NOT NULL,
  anxiety INT NOT NULL,

  FOREIGN KEY (survey_id) REFERENCES surveys(id)
);

CREATE TABLE who5_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  survey_id INT NOT NULL,

  positive_affect INT NOT NULL,
  calmness INT NOT NULL,
  vitality INT NOT NULL,
  restedness INT NOT NULL,
  life_interest  INT NOT NULL,

  FOREIGN KEY (survey_id) REFERENCES surveys(id)
);