const Eq5d = require("../questionnaires/eq5d.model");
const Who5 = require("../questionnaires/who5.model");

class QuestionnaireData {
  constructor(data = {}) {
    this.eq5d = new Eq5d(data.eq5dResponses);

    this.who5 = new Who5(data.who5Responses);
  }
}

module.exports = QuestionnaireData;
