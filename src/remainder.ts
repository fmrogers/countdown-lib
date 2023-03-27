export type RemainingTimeType = {
  [key: string]: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export class RemainderModel {
  private days: number = 0;
  private hours: number = 0;
  private minutes: number = 0;
  private seconds: number = 0;

  private errorHandler(
    type: "days" | "hours" | "minutes" | "seconds",
    max: number
  ): Error {
    const capitalizedType = type.charAt(0).toLocaleUpperCase() + type.slice(1);
    throw new Error(
      `${capitalizedType}: Value is either less than 0 or greater than ${max}`
    );
  }

  public setDays(remainingDays: number) {
    if (remainingDays < 0) {
      this.errorHandler("days", 31);
    }

    this.days = remainingDays;
  }

  public setHours(remainingHours: number) {
    if (remainingHours < 0 || remainingHours > 24) {
      this.errorHandler("days", 24);
    }

    this.hours = remainingHours;
  }

  public setMinutes(remainingMinutes: number) {
    if (remainingMinutes < 0 || remainingMinutes > 60) {
      this.errorHandler("minutes", 60);
    }

    this.minutes = remainingMinutes;
  }

  public setSeconds(remainingSeconds: number) {
    if (remainingSeconds < 0 || remainingSeconds > 60) {
      this.errorHandler("seconds", 60);
    }

    this.seconds = remainingSeconds;
  }

  public getRemainder(): RemainingTimeType {
    return {
      days: this.days,
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
    };
  }
}
