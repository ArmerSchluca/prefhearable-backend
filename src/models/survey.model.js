const DeviceInformation = require("./deviceInformation.model");

const PersonalData = require("./survey_modules/personalData.model");
const ContextData = require("./survey_modules/contextData.model");
const QuestionnaireData = require("./survey_modules/questionnaireData.model");
const AudioTestData = require("./survey_modules/audioTestData.model");

class Survey {
  constructor(data = {}) {
    this.surveyVersion = data.surveyVersion;

    this.startedAt = data.startedAt;
    this.finishedAt = data.finishedAt;

    this.deviceInformation = new DeviceInformation(data.deviceInformation);

    this.personalData = new PersonalData(data.personalData);

    this.contextData = new ContextData(data.contextData);

    this.questionnaireData = new QuestionnaireData(data.questionnaireData);

    this.audioTestData = new AudioTestData(data.audioTestData);
  }

  static fromJson(json) {
    return new Survey(json);
  }
}

module.exports = Survey;
