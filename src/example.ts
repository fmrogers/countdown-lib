import { Countdown, RemainingTimeType } from "./index";

const appContainer = document.getElementById("app");

const countdown = new Countdown("2023-03-27 21:24:00");

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
