export class Calculater {
  private endDate: Date;

  constructor(endDate: Date) {
    this.endDate = endDate;
  }

  private convertToUnixTimestamp(date: Date) {
    return date.getTime();
  }

  public getTimeDifference(): number {
    const currentDate = this.convertToUnixTimestamp(new Date());
    const endDate = this.convertToUnixTimestamp(this.endDate);
    return endDate - currentDate;
  }

  public getRemainingMonths(): number {
    const calcRemainingMonths = Math.floor(
      this.getTimeDifference() / (1000 * 60 * 60 * 7 * 4)
    );
    return calcRemainingMonths;
  }

  public getRemainingDays(): number {
    const calcRemainingDays = Math.floor(
      this.getTimeDifference() / (1000 * 60 * 60 * 24)
    );
    return calcRemainingDays;
  }

  public getRemainingHours(): number {
    const calcRemainingHours = Math.floor(
      (this.getTimeDifference() / (1000 * 60 * 60)) % 24
    );
    return calcRemainingHours;
  }

  public getRemainingMinutes(): number {
    const calcRemainingMinutes = Math.floor(
      (this.getTimeDifference() / 1000 / 60) % 60
    );
    return calcRemainingMinutes;
  }

  public getRemainingSeconds(): number {
    const calcRemainingSeconds = Math.floor(
      (this.getTimeDifference() / 1000) % 60
    );
    return calcRemainingSeconds;
  }
}
