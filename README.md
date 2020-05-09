# Countdown Lib

Countdown lib aims to simplify the presentation of counting down time by providing the core functionality needed as well as a few usefull helper methods. The library is a personal project written in TypeScript and made to be used with React/TypeScript. It should work with other libraries like Angular or Vue.

## Important Information

**Countdown-lib returns and iterates over `days`, `hours`, `minutes` and `seconds`. It does NOT include months or years.**

<br />
<br />

## Install with NPM

<pre>npm install countdown-lib</pre>

## Setup

Import the class and types before initilizing a ner isntance.

<pre>import Countdown, {TimeRemaining} from "countdown-lib/lib";</pre>
<pre>const countdown = new Countdown(new Date(2020, 11, 31, 00, 00);</pre>

<br />
<br />

## Available Methods

- `startCounter(callback: (remainder: TimeRemaining, isComplete: boolean) => void): void`<br />
  Starts the countdown and accepts a callback function that executes when time reaches zero.
- `addLeadingZeroes(value: number): string`<br />
  Add a leading '0' to any number less than 10 e.g. '08' or '04'.
- `stopCounter(interval: number): void`<br />
  Used to stop or 'clear' the interval.
- `isZeroHour(remainder: TimeRemaining): boolean`<br />
  Returns 'true' or 'false' when the counter reaches zero.

## Available Properties

- `timeRemaining: TimeRemaining` Initializes a default object literal with properties for `days`, `hours`, `minutes` and `seconds`, all staring at zero.
- `interval: number` contains the `setInterval()` function. And is stored as it's own property to allow for clearing the interval.
- `isComplete: boolean` Is set to true when coundown has reached zero.

<br />
<br />

## Example

Usage with a React and TypeScript project.

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
