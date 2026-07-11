class PersonalData {
  constructor(data = {}) {
    this.age = data.age;

    this.gender = data.gender;

    this.occupation = data.occupation;

    this.hearingAided = data.hearingAided;

    this.hearingAidDuration = data.hearingAidDuration;

    this.residentialArea = data.residentialArea;

    this.physicalActivityType = data.physicalActivityType;

    this.physicalActivityFrequency = data.physicalActivityFrequency;

    this.physicalActivityDuration = data.physicalActivityDuration;

    this.diet = data.diet;

    this.allergies = data.allergies ?? [];

    this.diseases = data.diseases ?? [];
  }
}

module.exports = PersonalData;
