import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  btn: document.querySelector('button'),
};

refs.btn.addEventListener('click', onPromiseCreate);
refs.btn.disabled = false;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onPromiseCreate(event) {
  event.preventDefault();

  let valueDelay = Number(refs.delay.value);
  let valueStep = Number(refs.step.value);
  let valueAmount = Number(refs.amount.value);

  refs.delay.value = '';
  refs.step.value = '';
  refs.amount.value = '';

  refs.btn.disabled = true;

  let promises = [];

  for (let i = 0; i <= valueAmount; i += 1) {
    let promise = valueDelay + valueStep * i;

    promises.push(
      createPromise(i, promise)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        })
    );
  }
  Promise.all(promises).finally(() => {
    refs.btn.disabled = false;
  });
}
