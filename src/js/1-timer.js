import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate;
let timerInterval;

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      iziToast.error({
        title: 'Помилка',
        message: 'Будь ласка, виберіть дату в майбутньому',
        position: 'topRight',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

startButton.addEventListener('click', () => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  startButton.disabled = true;
  datetimePicker.disabled = true;

  timerInterval = setInterval(() => {
    const now = new Date();
    const timeDiff = userSelectedDate.getTime() - now.getTime();

    if (timeDiff <= 0) {
      clearInterval(timerInterval);
      daysValue.textContent = '00';
      hoursValue.textContent = '00';
      minutesValue.textContent = '00';
      secondsValue.textContent = '00';
      iziToast.success({
        title: 'Успіх',
        message: 'Відлік завершено!',
        position: 'topRight',
      });
      datetimePicker.disabled = false;
      startButton.disabled = true;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDiff);
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  }, 1000);
});

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
  return String(value).padStart(2, '0');
}
