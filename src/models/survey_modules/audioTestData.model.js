const CcsmAudioTest = require("../audio_tests/ccsmAudioTest.model");

class AudioTestData {
  constructor(data = {}) {
    this.ccsm = new CcsmAudioTest(data.ccsm);
  }
}

module.exports = AudioTestData;
