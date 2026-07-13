class ContextData {
  constructor(data = {}) {
    this.latitude = data.latitude;
    this.longitude = data.longitude;

    this.locationType = data.locationType;
    this.season = data.season;

    this.noiseLevel = data.noiseLevel;

    this.timestamp = data.timestamp;

    this.weather = new WeatherData(data.weather);
    this.airQuality = new AirQualityData(data.airQuality);
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

class AirQualityData {
  constructor(data = {}) {
    this.europeanAqi = data.europeanAqi;
    this.pm25 = data.pm25;
    this.pm10 = data.pm10;
    this.nitrogenDioxide = data.nitrogenDioxide;
    this.ozone = data.ozone;
  }
}

module.exports = ContextData;
