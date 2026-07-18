CREATE DATABASE IF NOT EXISTS prefhearable;

CREATE TABLE participants (
  id CHAR(36) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  age INT,
  gender ENUM('male', 'female', 'diverse'),

  occupation ENUM(  
  'student',
  'office',
  'manualLabor',
  'healthcare',
  'education',
  'unemployed',
  'retired',
  'other'
  ),

  hearing_aid ENUM('both', 'leftEar', 'rightEar', 'none'),
  hearing_aid_duration ENUM(  
    'lessThan6Months',
    'sixToTwelveMonths',
    'oneToTwoYears',
    'twoToFiveYears',
    'fiveToTenYears',
    'moreThanTenYears'
  ),
  hearing_aid_type ENUM (
    'behindTheEar',
    'inTheEar',
    'cochlearImplant',
    'boneConduction',
    'other'
  ),

  residential_area ENUM('urban', 'suburban', 'rural'),

  physical_activity_type ENUM (
    'endurance', 'strength', 'combined', 'team', 'other', 'none'
  ),
  physical_activity_frequency ENUM (
    'oneToTwoPerWeek','threeToFourPerWeek','fivePlusPerWeek'
  ),
  physical_activity_duration SMALLINT,

  diet ENUM('omnivore', 'vegetarian', 'vegan', 'other'),

  allergies TEXT,
  diseases TEXT
);

CREATE TABLE surveys (
  id INT AUTO_INCREMENT PRIMARY KEY,
  participant_id CHAR(36) NOT NULL,

  survey_version VARCHAR(20) NOT NULL,

  started_at DATETIME NOT NULL,
  finished_at DATETIME NOT NULL,

  FOREIGN KEY (participant_id) REFERENCES participants(id)
);

CREATE TABLE device_information (
  id INT AUTO_INCREMENT PRIMARY KEY,
  survey_id INT NOT NULL UNIQUE,

  operating_system VARCHAR(50),
  model VARCHAR(100),
  app_version VARCHAR(20),

  FOREIGN KEY (survey_id) REFERENCES surveys(id)
    ON DELETE CASCADE
);

CREATE TABLE personal_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  survey_id INT NOT NULL UNIQUE,

  age INT,
  gender ENUM('male', 'female', 'diverse'),

  occupation ENUM(  
  'student',
  'office',
  'manualLabor',
  'healthcare',
  'education',
  'unemployed',
  'retired',
  'other'
  ),

  hearing_aid ENUM('both', 'leftEar', 'rightEar', 'none'),
  hearing_aid_duration ENUM(  
    'lessThan6Months',
    'sixToTwelveMonths',
    'oneToTwoYears',
    'twoToFiveYears',
    'fiveToTenYears',
    'moreThanTenYears'
  ),
  hearing_aid_type ENUM (
    'behindTheEar',
    'inTheEar',
    'cochlearImplant',
    'boneConduction',
    'other'
  ),

  residential_area ENUM('urban', 'suburban', 'rural'),

  physical_activity_type ENUM (
    'endurance', 'strength', 'combined', 'team', 'other', 'none'
  ),
  physical_activity_frequency ENUM (
    'oneToTwoPerWeek','threeToFourPerWeek','fivePlusPerWeek'
  ),
  physical_activity_duration SMALLINT,

  diet ENUM('omnivore', 'vegetarian', 'vegan', 'other'),

  allergies TEXT,
  diseases TEXT,

  FOREIGN KEY (survey_id) REFERENCES surveys(id)
);

CREATE TABLE context_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  survey_id INT NOT NULL UNIQUE,

  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),

  location_type ENUM('indoor', 'outdoor'),

  season ENUM('spring', 'summer', 'autumn', 'winter'),

  noise_level DECIMAL(5,2),

  timestamp DATETIME,

  weather_description VARCHAR(50),
  temperature DECIMAL(4,1),
  humidity DECIMAL(5,2),
  wind_speed DECIMAL(5,2),
  uv_index DECIMAL(3,1),

  european_aqi DECIMAL(5,2),
  pm25 DECIMAL(6,2),
  pm10 DECIMAL(6,2),
  nitrogen_dioxide DECIMAL(6,2),
  ozone DECIMAL(6,2),

  FOREIGN KEY (survey_id) REFERENCES surveys(id)
);

CREATE TABLE ccsm_audiotest_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  survey_id INT NOT NULL,

  sound_identifier VARCHAR(255) NOT NULL,

  audio_device VARCHAR(100),

  loudness INT NOT NULL,
  roughness INT NOT NULL,
  tonality INT NOT NULL,
  annoyance INT NOT NULL,
  sharpness INT NOT NULL,

  FOREIGN KEY (survey_id) REFERENCES surveys(id),

  UNIQUE (survey_id, sound_identifier)
);

CREATE TABLE eq5d5l_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  survey_id INT NOT NULL UNIQUE,

  mobility INT NOT NULL,
  self_care INT NOT NULL,
  usual_activities INT NOT NULL,
  pain INT NOT NULL,
  anxiety INT NOT NULL,

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

  FOREIGN KEY (survey_id) REFERENCES surveys(id)
);
