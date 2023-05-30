import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
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

const selector = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownInterval;

const optionsFP = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];

      if (selectedDates < new Date()) {
        window.alert("Please choose a date in the future");
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
      }
    },
};
flatpickr(selector, optionsFP);

startButton.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(selector.value);
  const currentDate = new Date();
  const differenceTime = selectedDate.getTime() - currentDate.getTime();

  if(differenceTime <= 0){
    window.alert("Please choose a date in the future");
    return;
  }
  startButton.disabled = true;
})

