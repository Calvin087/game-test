class Chronometer {
  constructor() {
    this.currentTime = 300;
    this.intervalId = null;
  }

  init(callback) {
    this.intervalId = setInterval(() => {
      this.currentTime--;

      let seconds = this.getSeconds();
      let minutes = this.getMinutes();

      document.getElementById(
        "timer"
      ).textContent = `${this.computeTwoDigitNumber(
        minutes
      )}:${this.computeTwoDigitNumber(seconds)}`;

      if (this.currentTime === 0) {
        callback();
        this.stop();
      }
    }, 820);
  }

  getMinutes() {
    let minutes = this.currentTime / 60;
    let roundDown = Math.floor(minutes);
    let result = Number(roundDown.toFixed());
    return result;
  }

  getSeconds() {
    let secondsPerMin = 60;
    let result = this.currentTime % secondsPerMin;
    return result;
  }

  computeTwoDigitNumber(value) {
    if (value.toString().length === 1) {
      return "0" + value.toString();
    } else {
      return value.toString();
    }
  }

  stop() {
    clearInterval(this.intervalId);
  }

  reset() {
    this.currentTime = 0;
  }

  split() {
    let minutes = this.getMinutes();
    let seconds = this.getSeconds();
    let minsString = this.computeTwoDigitNumber(minutes);
    let secsString = this.computeTwoDigitNumber(seconds);
    return `${minsString}:${secsString}`;
  }
}
