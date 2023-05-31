import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownInterval;

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
        Notiflix.Notify.failure("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

startButton.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(datetimePicker.value);
  const currentDate = new Date();
  const timeDifference = selectedDate.getTime() - currentDate.getTime();

  if (timeDifference <= 0) {
    Notiflix.Notify.failure("Please choose a date in the future");
    return;
  }

  startButton.disabled = true;

  countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const remainingTime = selectedDate.getTime() - currentTime;

    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      daysValue.textContent = "00";
      hoursValue.textContent = "00";
      minutesValue.textContent = "00";
      secondsValue.textContent = "00";
      Notiflix.Notify.success("Countdown completed!");
      startButton.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  }, 1000);
});
