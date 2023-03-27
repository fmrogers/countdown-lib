import { Countdown } from "./main";

const appContainer = document.getElementById("app");

const countdown = new Countdown(new Date(2023, 5, 1, 17));

countdown.startCounter((remainder, isComplete) => {
  if (appContainer) {
    appContainer.innerHTML = `${countdown.addLeadingZeros(
      remainder.days
    )} - ${countdown.addLeadingZeros(
      remainder.hours
    )} - ${countdown.addLeadingZeros(
      remainder.minutes
    )} - ${countdown.addLeadingZeros(remainder.seconds)}`;
  }

  if (isComplete) {
    if (appContainer) {
      appContainer.innerHTML += " [STOPPED]";
    }
    countdown.stopCounter();
  }
});
