import { Countdown } from ".";

const appContainer = document.getElementById("app");

const countdown = new Countdown(new Date(2028, 5, 1, 17));

countdown.startCounter((remainder, isComplete) => {
  if (appContainer) {
    appContainer.innerHTML = `${Countdown.addLeadingZeros(remainder.days)} - ${Countdown.addLeadingZeros(
      remainder.hours,
    )} - ${Countdown.addLeadingZeros(remainder.minutes)} - ${Countdown.addLeadingZeros(remainder.seconds)}`;
  }

  if (isComplete) {
    if (appContainer) {
      appContainer.innerHTML += " [STOPPED]";
    }
    countdown.stopCounter();
  }
});
