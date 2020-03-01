export interface TimeRemaining {
  [index: string]: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default class Countdown {
  private timeRemaining: TimeRemaining = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  private currentDateTimeStamp = 0;
  private endDateTimeStamp = 0;
  private interval = 0;
  private timeout = 1000;
  private difference = 0;
  private isComplete = false;

  constructor(endDate?: string) {
    this.endDateTimeStamp = endDate ? Date.parse(endDate) : 0;
  }

  public startCounter(callback: (remainder: TimeRemaining, isComplete: boolean) => void): void {
    this.interval = setInterval(() => {
      const remainder = this.calculateCountDown();
      this.isZeroHour(remainder) && this.stopCounter(this.interval);
      callback(remainder, this.isComplete);
    }, this.timeout);
  }

  public addLeadingZeros(value: number): string {
    let stringValue = value.toString();
    if (stringValue.length < 2) {
      stringValue = `0${value}`;
    }
    return stringValue;
  }

  private stopCounter(interval: number): void {
    clearInterval(interval);
    this.isComplete = true;
  }

  private isZeroHour(remainder: TimeRemaining) {
    const remainingValues = Object.keys(remainder).map((key) => remainder[key]);
    const isZero = remainingValues.reduce((accumulator, currentValue) => accumulator + currentValue);
    return isZero === 0 ? true : false;
  }

  private calculateCountDown(): TimeRemaining {
    this.currentDateTimeStamp = Date.parse(String(new Date()));
    this.difference = this.endDateTimeStamp - this.currentDateTimeStamp;

    if (this.difference >= 0) {
      this.timeRemaining.days = Math.floor(this.difference / (1000 * 60 * 60 * 24));
      this.timeRemaining.hours = Math.floor((this.difference / (1000 * 60 * 60)) % 24);
      this.timeRemaining.minutes = Math.floor((this.difference / 1000 / 60) % 60);
      this.timeRemaining.seconds = Math.floor((this.difference / 1000) % 60);
    }
    return this.timeRemaining;
  }
}
