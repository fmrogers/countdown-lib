export interface TimeRemaining {
  [index: string]: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default class Countdown {
  public timeRemaining: TimeRemaining = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  public interval: number = 0;
  public isComplete: boolean = false;
  private currentDateTimeStamp: number = 0;
  private endDateTimeStamp: number = 0;
  private timeout: number = 1000;
  private difference: number = 0;

  constructor(endDate?: Date) {
    this.endDateTimeStamp = endDate ? endDate.getTime() : 0;
  }

  public startCounter(callback: (remainder: TimeRemaining, isComplete: boolean) => void): void {
    this.interval = setInterval(() => {
      this.timeRemaining = this.calculateCountDown();
      this.isZeroHour(this.timeRemaining);
      callback(this.timeRemaining, this.isComplete);
    }, this.timeout);
  }

  public addLeadingZeros(value: number): string {
    let stringValue = String(value);
    if (stringValue.length < 2) {
      stringValue = `0${stringValue}`;
    }
    return stringValue;
  }

  public stopCounter(interval: number): void {
    clearInterval(interval);
    this.isComplete = true;
  }

  public isZeroHour(remainder: TimeRemaining) {
    const remainingValues = Object.keys(remainder).map((key) => remainder[key]);
    const isZero = remainingValues.reduce((accumulator, currentValue) => accumulator + currentValue);
    return isZero === 0 ? (this.isComplete = true) : (this.isComplete = false);
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
