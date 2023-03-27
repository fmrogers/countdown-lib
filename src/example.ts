import { Countdown } from "./index";

const appContainer = document.getElementById("app");

const countdown = new Countdown(new Date(2023, 2, 27, 21, 30));

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
