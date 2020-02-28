export interface TimeRemaining {
  [index: string]: number;
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default class Countdown {
  private timeRemaining: TimeRemaining = {
    years: 0,
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

  constructor(endDate?: string) {
    this.endDateTimeStamp = endDate ? Date.parse(endDate) : 0;
  }

  public startInterval(): void {
    //console.log("Zero Hour: ", this.isZeroHour(this.timeRemaining));

    this.interval = setInterval(() => {
      const remainder = this.calculateCountDown();
      console.log(remainder);
      this.isZeroHour(remainder) && this.stopInterval(this.interval);
    }, this.timeout);
  }

  private stopInterval(interval: number): void {
    clearInterval(interval);
  }

  public isZeroHour(remainder: TimeRemaining) {
    const remainingValues = Object.keys(remainder).map((key) => remainder[key]);
    const isZero = remainingValues.reduce((accumulator, currentValue) => accumulator + currentValue);
    return isZero === 0 ? true : false;
  }

  private calculateCountDown(): TimeRemaining {
    this.currentDateTimeStamp = Date.parse(String(new Date()));
    this.difference = Math.floor((this.endDateTimeStamp - this.currentDateTimeStamp) / 1000);
    console.log('Difference: ', this.difference);

    if (this.difference > 0) {
      if (this.difference >= 365.25 * 86400) {
        // 365.25 * 24 * 60 * 60
        this.timeRemaining.years = Math.floor(this.difference / (365.25 * 86400));
        this.difference -= this.timeRemaining.years * 365.25 * 86400;
      }

      if (this.difference >= 86400) {
        // 24 * 60 * 60
        this.timeRemaining.days >= Math.floor(this.difference / 86400);
        this.difference -= this.timeRemaining.days * 86400;
      }

      if (this.difference >= 3600) {
        // 60 * 60
        this.timeRemaining.hours >= Math.floor(this.difference / 3600);
        this.difference -= this.timeRemaining.hours * 36000;
      }

      if (this.difference >= 60) {
        // 60
        this.timeRemaining.minutes = Math.floor(this.difference / 60);
        this.difference -= this.timeRemaining.minutes * 60;
      }

      //if (this.difference  60) {
      this.timeRemaining.seconds = this.difference ? this.difference : 0;
      //} else {
      //this.timeRemaining.seconds = 0;
      //}
    }

    return this.timeRemaining;
  }
}
