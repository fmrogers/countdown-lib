# Countdown Lib

Countdown lib aims to simplify the presentation of counting down time by providing the core functionality needed as well as a few usefull helper methods. The library is a personal project written in TypeScript and made to be used with React/TypeScript. However it should work with other libraries like Angular or Vue.

## Important Information

**Countdown-lib returns and iterates over `days`, `hours`, `minutes` and `seconds`. It does NOT include months or years.**

## Install with NPM

---

<pre>npm install countdown-lib</pre>

## Setup

---

Import the class and types before initilizing a ner isntance.

```javascript
import Countdown, { TimeRemaining } from 'countdown-lib/lib';
```

## Date Format

---

At present countdown-lib only supports a single date format 'arguments'. The reason for this is simply browser compatability. Originally i used a string format for date and time, but that was problematic for Safari. All modern browsers should support the 'arguments' format.

The date is passed to countdown-lib contrsuctor by initializing a `new Date()` object and passing 6 arguments, year, month, day, hour, minutes and seconds.

```javascript
const countdown = new Countdown(new Date(2020, 11, 31, 00, 00);
```

### **Creating dates with arguments**

The `new Date()` object can accept up to 7 arguments, each of the type `number`.

1. **Year:** 4-digit year.
2. **Month:** Month of the years (0-11). **_Important note_**: _The month argument is **zero indexed**_.
3. **Day:** Day of the month (1-31). Defaults to 1 if omitted.
4. **Hour:** Hour of the day (0-23). Defaults 0 if omitted.
5. **Minutes:** Minutes (0-59). Defaults to 0 if omitted.
6. **Seconds:** Seconds (0-59). Defaults to 0 if omitted.
7. **Milliseconds** Milliseconds (-999). Defaults 0 if ommited.

**NB!** The _seventh_ argument _milliseconds_ is neither required nor used for the initiliazation of the countdown-lib class.

## Available Methods

---

- `startCounter(callback: (remainder: TimeRemaining, isComplete: boolean) => void): void` - Starts the countdown and accepts a callback function that executes when time reaches zero.
- `addLeadingZeroes(value: number): string` - Add a leading '0' to any number less than 10 e.g. '08' or '04'.
- `stopCounter(interval: number): void` - Used to stop or 'clear' the interval.
- `isZeroHour(remainder: TimeRemaining): boolean` - Returns 'true' or 'false' when the counter reaches zero.

## Available Properties

---

- `timeRemaining: TimeRemaining` - Initializes a default object literal with properties for `days`, `hours`, `minutes` and `seconds`, all starting at zero.
- `interval: number` - contains the `setInterval()` function. And is stored as it's own property to allow for clearing the interval.
- `isComplete: boolean` - Is set to `true` when coundown has reached zero.

## React/TypeScript Example.

---

```javascript
const App = () => {
  const [timeRemaining, setTimeRemaining] = useState({} as TimeRemaining);
  const [isComplete, setIsComplete] = useState(false);

  const countdown = new Countdown(new Date(2020, 4, 28, 17, 30));

  useEffect(() => {
    if (isComplete) return;
    countdown.startCounter((timeRemaining: TimeRemaining, isComplete: boolean): void => {
      setTimeRemaining(timeRemaining);
      setIsComplete(countdown.isComplete);
    }
  );

    return () => countdown.stopCounter(countdown.interval);
  }, [countdown]);

  return (
    <div className="App">
      <div>
        <div>{countdown.addLeadingZeros(timeRemaining.days)}</div>
        <div>{countdown.addLeadingZeros(timeRemaining.hours)}</div>
        <div>{countdown.addLeadingZeros(timeRemaining.minutes)}</div>
        <div>{countdown.addLeadingZeros(timeRemaining.seconds)}</div>
      </div>
    </div>
  );
};

export default App;
```
