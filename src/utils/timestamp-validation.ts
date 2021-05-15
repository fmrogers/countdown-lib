export enum ErrorMessages {
  INCORRECT_FORMAT = 'Incorrect format, please use ISO 8601! Example: YYYY-MM-DDTHH:mm:ss',
}

export class ValidateTimeStamp {
  private readonly _validInputFormat: boolean = false;
  private readonly _validDate: boolean = false;
  private readonly _validTime: boolean = false;

  constructor(timeStamp: string) {
    this._validInputFormat = this.validateInputFormat(timeStamp);

    if (this._validInputFormat) {
      const splitTimeStamp = timeStamp.split('T');
      const date = splitTimeStamp[0];
      const time = splitTimeStamp[1];

      this._validDate = this.validateDate(date);
      this._validTime = this.validateTime(time);
    } else {
      throw new Error(ErrorMessages.INCORRECT_FORMAT);
    }
  }

  public get validInputFormat() {
    return this._validInputFormat;
  }

  public get validDate() {
    return this._validDate;
  }

  public get validTime() {
    return this._validTime;
  }

  private validateInputFormat(timeStamp: string) {
    const regEx = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}/g);
    return regEx.test(timeStamp);
  }

  private validateDate(date: string): boolean {
    const splitDateString = date.split('-');
    const year = splitDateString[0];
    const month = splitDateString[1];
    const day = splitDateString[2];

    const validYear = year.length === 4;
    const validMonth = Number(month) >= 1 && Number(month) <= 12;
    const validDay = Number(day) <= 31;

    return validYear && validMonth && validDay;
  }

  private validateTime(time: string): boolean {
    const splitTimeString = time.split(':');
    const hours = splitTimeString[0];
    const minutes = splitTimeString[1];
    const seconds = splitTimeString[2];

    const validHours = Number(hours) <= 24 && Number(hours) >= 0;
    const validMinutes = this.validateTo60(Number(minutes));
    const validSeconds = this.validateTo60(Number(seconds));

    return validHours && validMinutes && validSeconds;
  }

  private validateTo60(value: number): boolean {
    return Number(value) <= 60 && Number(value) >= 0;
  }
}
