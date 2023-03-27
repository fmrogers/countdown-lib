import { RemainderModel, RemainingTimeType } from "./remainder";
import { Calculater } from "./calculator";

export class Countdown {
  private endDate: Date;
  private timeRemaining: RemainderModel;
  private calculator: Calculater;

  public counter: number | null;
  public isComplete: boolean = false;

  constructor(endDate: Date) {
    this.endDate = endDate;
    this.timeRemaining = new RemainderModel();
    this.calculator = new Calculater(this.endDate);
    this.counter = null;

    this.calculateRemainder();
  }

  private calculateRemainder(): void {
    if (this.calculator.getTimeDifference() >= 0) {
      this.timeRemaining.setDays(this.calculator.getRemainingDays());
      this.timeRemaining.setHours(this.calculator.getRemainingHours());
      this.timeRemaining.setMinutes(this.calculator.getRemainingMinutes());
      this.timeRemaining.setSeconds(this.calculator.getRemainingSeconds());
    }
  }

  private isZeroHour(remainder: RemainingTimeType) {
    const remainingValues = Object.keys(remainder).map((key) => remainder[key]);
    const isZero = remainingValues.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    return isZero === 0 ? (this.isComplete = true) : (this.isComplete = false);
  }

  public startCounter(
    callback: (remainder: RemainingTimeType, isComplete: boolean) => void
  ): void {
    this.counter = setInterval((): void => {
      this.calculateRemainder();
      callback(
        this.timeRemaining.getRemainder(),
        this.isZeroHour(this.timeRemaining.getRemainder())
      );
    }, 1000);
  }

  public getRemainingTime(): RemainingTimeType {
    return this.timeRemaining.getRemainder();
  }

  public addLeadingZeros(value: number): string {
    let stringValue = String(value);
    if (stringValue.length < 2) {
      stringValue = `0${stringValue}`;
    }
    return stringValue;
  }

  public stopCounter(): void {
    if (this.counter) {
      clearInterval(this.counter);
    }
  }
}
