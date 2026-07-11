class ContextData {
  constructor(data = {}) {
    this.latitude = data.latitude;
    this.longitude = data.longitude;

    this.locationType = data.locationType;
    this.season = data.season;

    this.noiseLevel = data.noiseLevel;

    this.timestamp = data.timestamp;

    this.weather = new WeatherData(data.weather);
  }
}

class WeatherData {
  constructor(data = {}) {
    this.description = data.description;
    this.temperature = data.temperature;
    this.humidity = data.humidity;
    this.windSpeed = data.windSpeed;
    this.uvIndex = data.uvIndex;
  }
}

module.exports = ContextData;
