import Countdown from '../countdown';

const example = new Countdown();

example.setEndDate('2020-02-17 21:23:00');

console.log(example.getEndDate());

example.startCounting((remainder, isComplete) => {
  console.log('Remainder: ', remainder);
  if (isComplete) {
    console.log('the countdown is complete');
  }
});
