import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const TIME_DELAY = 1000;

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  dateInput: document.querySelector('input#datetime-picker'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartTimer);
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() > 0) {
      refs.startBtn.disabled = false;
    } else {
      refs.startBtn.disabled = true;
      Report.failure(
        'Ooops...',
        'Please, choose a date in the future',
        'Try again'
      );
    }
  },
};

const fp = flatpickr(refs.dateInput, options);

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

function onStartTimer() {
  refs.dateInput.disabled = true;

  intervalId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(
      fp.selectedDates[0] - Date.now()
    );

    if (days + hours + minutes + seconds === 0) {
      clearInterval(intervalId);
      Report.success(
        'Congratulations! Time is over!',
        'Please, choose a new date.',
        'Let go!'
      );
      refs.startBtn.disabled = true;
      refs.dateInput.disabled = false;
    }

    refs.dataDays.textContent = addLeadingZero(days);
    refs.dataHours.textContent = addLeadingZero(hours);
    refs.dataMinutes.textContent = addLeadingZero(minutes);
    refs.dataSeconds.textContent = addLeadingZero(seconds);
  }, TIME_DELAY);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
