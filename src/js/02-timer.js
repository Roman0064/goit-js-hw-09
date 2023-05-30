import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

const selector = document.getElementById('datetime-picker');
const optionsFP = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
};
flatpickr(selector, optionsFP);

