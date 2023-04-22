import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

const feedback = document.querySelector('.feedback-form');

feedback.addEventListener('input', throttle(onFeedbackFormMessage, 500));
feedback.addEventListener('submit', onFormSubmit);

reloadPage();

function onFeedbackFormMessage(e) {
  formData[e.target.name] = e.target.value || '';
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  console.log(formData);
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}

function reloadPage() {
  const savedInformation = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedInformation) {
    const { email, message } = savedInformation;
    feedback.email.value = email || '';
    feedback.message.value = message || '';
    console.log(savedInformation);
  }
}
