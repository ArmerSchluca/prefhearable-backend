class CcsmAudioTest {
  constructor(data = {}) {
    this.audioDevice = data.audio_device;

    this.artificialSound1 = new SoundRating(data.artificialSound1);
    this.naturalSound1 = new SoundRating(data.naturalSound1);
    this.naturalSound2 = new SoundRating(data.naturalSound2);
  }
}

class SoundRating {
  constructor(data = {}) {
    this.loudness = data.loudness;
    this.roughness = data.roughness;
    this.tonality = data.tonality;
    this.annoyance = data.annoyance;
    this.sharpness = data.sharpness;
  }
}

module.exports = CcsmAudioTest;
