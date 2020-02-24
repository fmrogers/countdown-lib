export interface unitsOfTime {
  [key: string]: number;
  secondsInDay: number;
  daysOfYear: number;
  secondsInHour: number;
  secondsInMinute: number;
}

export interface timeRemaining {
  [key: string]: number;
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default class Countdown {
  private timeRemaining: timeRemaining = {
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  private isComplete: boolean = false;

  private unitsOfTime: unitsOfTime = {
    secondsInDay: 86400,
    daysOfYear: 365.25,
    secondsInHour: 3600,
    secondsInMinute: 60,
  };

  private currentDateTimeStamp: number = 0;
  private endDateTimeStamp: number = 0;
  private interval: number = 0;
  private increment: number = 1000;

  public setEndDate(endDate: string) {
    this.endDateTimeStamp = Date.parse(endDate);
  }

  public getEndDate() {
    return new Date(this.endDateTimeStamp).toLocaleString('nb-NO');
  }

  public startCounting(callback: (remainder: timeRemaining, isComplete: boolean) => void) {
    this.interval = window.setInterval(() => {
      const remainder = this.calculateTimeRemaining();
      this.isZeroHour(remainder) && this.stopInterval(this.interval);
      callback(remainder, this.isComplete);
    }, this.increment);
  }

  public stopInterval(interval: number) {
    interval && clearInterval(interval);
    this.isComplete = true;
  }

  public addLeadingZeros(value: number): string {
    let stringValue: string = value.toString();
    const two: number = 2;
    if (stringValue.length < two) {
      stringValue = `0${value}`;
    }
    return stringValue;
  }

  private isZeroHour(remainder: timeRemaining): boolean {
    const remainingValues = Object.keys(remainder).map((key) => remainder[key]);
    const hasMoreTime = remainingValues.reduce((accumulator, currentValue) => accumulator + currentValue);

    if (hasMoreTime) {
      return false;
    }
    return true;
  }

  private calculateTimeRemaining(): timeRemaining {
    this.currentDateTimeStamp = Date.now();
    const { secondsInDay, daysOfYear, secondsInHour, secondsInMinute } = this.unitsOfTime;
    let distance: number = (this.endDateTimeStamp - this.currentDateTimeStamp) / 1000;

    if (distance >= 0) {
      // Years left
      if (distance >= daysOfYear * secondsInDay) {
        // 365.25 * 24 * 60 * 60
        this.timeRemaining.years = Math.floor(distance / (daysOfYear * secondsInDay));
        distance -= this.timeRemaining.years * daysOfYear * secondsInDay;
      }
      // Days left
      if (distance >= secondsInDay) {
        // 24 * 60 * 60
        this.timeRemaining.days = Math.floor(distance / secondsInDay);
        distance -= this.timeRemaining.days * secondsInDay;
      }
      // Hours left
      if (distance >= secondsInHour) {
        // 60 * 60
        this.timeRemaining.hours = Math.floor(distance / secondsInHour);
        distance -= this.timeRemaining.hours * secondsInHour;
      }
      // Minutes left
      if (distance >= secondsInMinute) {
        // 60
        this.timeRemaining.minutes = Math.floor(distance / secondsInMinute);
        distance -= this.timeRemaining.minutes * secondsInMinute;
      }
      // Seconds left
      this.timeRemaining.seconds = Math.floor(distance);
    }

    return this.timeRemaining;
  }
}
