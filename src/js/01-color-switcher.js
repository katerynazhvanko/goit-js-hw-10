const CHANGE_COLOR_DELAY = 1000;
let intervalId = null;

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', onStartChangeColor);
stopBtn.addEventListener('click', onStopChangeColor);

stopBtn.disabled = true;

function onStartChangeColor() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, CHANGE_COLOR_DELAY);

  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function onStopChangeColor() {
  clearInterval(intervalId);

  stopBtn.disabled = true;
  startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
