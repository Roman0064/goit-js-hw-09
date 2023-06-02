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

function addLeadZero(value){
  return value.toString().padStart(2, "0");
}

const datetimePicker = document.getElementById("datetime-picker");
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let countInterval;

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
});

startBtn.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(datetimePicker.value);
  const currentDate = new Date();
  const diffTime = selectedDate.getTime() - currentDate.getTime();
  
  if (diffTime <= 0) {
    Notiflix.Notify.failure("Please choose a date in the future");
    return;
  }

  startBtn.disabled = true;

  countInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const remTime = selectedDate.getTime() - currentTime;

    if(remTime <= 0){
      clearInterval(countInterval);
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      Notiflix.Notify.success("CountDown Comleted!");
      startBtn.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(remTime);

    daysEl.textContent = addLeadZero(days);
    hoursEl.textContent = addLeadZero(hours);
    minutesEl.textContent = addLeadZero(minutes);
    secondsEl.textContent = addLeadZero(seconds);
  }, 1000);
});