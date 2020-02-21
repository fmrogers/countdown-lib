import Countdown from './countdown';

const example = new Countdown();

example.setEndDate('2020-02-21 21:36:00');

console.log('Ends Date:', example.getEndDate());

// example.startCounting((remainder, isComplete) => {
//   console.log('Remainder: ', remainder);
//   if (isComplete) {
//     console.log('the countdown is complete');
//   }
// });
