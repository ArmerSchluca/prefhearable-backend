class DeviceInformation {
  constructor(data = {}) {
    this.appVersion = data.appVersion;

    this.operatingSystem = data.operatingSystem;

    this.model = data.model;
  }
}

module.exports = DeviceInformation;
