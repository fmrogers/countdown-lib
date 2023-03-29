# Countdown Library

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

<p>
  <a href="https://github.com/fmrogers/countdown-lib/issues/new">Report issue or request a feature</a>
    ·
  <a href="https://github.com/fmrogers/countdown-lib/pulls">Make a pull request</a>
</p>

<br />

## Table of Contents

- [Features](#features)
- [Installing](#installing)
- [Examples](#examples)
- [API](#countdown-lib-api)
- [Types](#exposed-types)

<br />

## Features

- Written in TypeScript.
- Can be used with any JS library or framework.
- Uses (setInterval).
- Easy to use callback method.
- Return values include days, hours, minutes and seconds.
- Optional methods of alternative implementations.

<br />

## Installing

### Using npm:

```bash
$ npm install countdown-lib
```

<br />

## Examples

### Vanilla TypeScript

```ts
import { Countdown, RemainingTimeType } from "countdown-lib";

// Any JavaScript supported date format can be used as long as it is passed as a Date object.
const countdown = new Countdown(new Date(2023, 0, 1, 0, 0, 0));

countdown.startCounter((remainder: RemainingTimeType, isComplete: boolean) => {
  // isComplete will return false when all values are zero.
  if (!isComplete) {
    // Remainder should look something like this:
    // { days: 45, hours: 5, minutes: 32, seconds: 12 }
    console.log(remainder);
  }
});
```

### React 16.8+

```ts
// These react imports may vary depending on your build tools.
import { react, FC, useState, useEffect } from "react";
import { Countdown, RemainingTimeType } from "countdown-lib";

export const CountdownExample: FC = () => {
  const [remainingTime, setRemainingTime] = useState<RemainingTimeType>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [countdownComplete, setCountdownComplete] = useState<boolean>(false);
  const countdown = new Countdown(new Date(2023, 0, 1, 0, 0, 0));

  useEffect(() => {
    if (isComplete) return;

    countdown.startCounter(
      (remainder: TimeRemainingType, isComplete: boolean) => {
        setRemainingTime(remainder);
        if (isComplete) {
          setIsComplete(isComplete);
        }
      }
    );
  }, [remainingTime, setRemainingTime]);

  return (
    <div>{`${remainingTime.days} ${remainingTime.hours} ${remainingTime.minutes} ${remainingTime.seconds}`}</div>
  );
};
```

<br />

## Countdown-lib API

**countdown.startCounter(callback)**

```ts
// Starts a instance of setInterval that executes a callback every 1000ms with arguments
// for remaining time and a truthy value when countdown is complete.
countdown.startCounter(callback(remainder: TimeRemainingType, isComplete: boolean) => void): void;
```

**countdown.stopCounter()**

```ts
// Clears setInterval
countdown.stopCounter(): void
```

**countdown.getRemainingTime()**

```ts
// Optional method for retrieving remaining time outside of the .startCounter() callback.
countdown.getRemainingTime(): RemainingTimeType
```

**countdown.addLeadingZero()**

```ts
// Add leading zeroes to values < 10, ie. 01, 02, 03.
countdown.addLeadingZero(value: number): string
```

<br />

## Exposed Types

### RemainingTimeType

```ts
type RemainingTimeType = {
  [key: string]: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
```

<br/>

<p align="right">(<a href="#countdown-library">back to top</a>)</p>
