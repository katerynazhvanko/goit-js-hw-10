import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

import fetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.countryList.style.visibility = 'hidden';
refs.countryInfo.style.visibility = 'hidden';

refs.searchInput.addEventListener(
  'input',
  debounce(onInputSearch, DEBOUNCE_DELAY)
);

function onInputSearch(e) {
  e.preventDefault();

  const searchCountries = e.target.value.trim();

  if (!searchCountries) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    refs.countryList.style.visibility = 'hidden';
    refs.countryInfo.style.visibility = 'hidden';
    return;
  }

  fetchCountries(searchCountries)
    .then(result => {
      if (result.length > 10) {
        Notify.info(
          'Too many matches found. Please, enter a more specific name.'
        );
        return;
      }
      renderingCountries(result);
    })
    .catch(error => {
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderingCountries(result) {
  const inputLetters = result.length;

  if (inputLetters === 1) {
    refs.countryList.innerHTML = '';
    refs.countryList.style.visibility = 'hidden';
    refs.countryInfo.style.visibility = 'visible';
    renderFullDescription(result);
  }

  if (inputLetters > 2 && inputLetters <= 10) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.style.visibility = 'visible';
    refs.countryInfo.style.visibility = 'hidden';
    renderSmallDescription(result);
  }
}

function renderSmallDescription(result) {
  const listMarkup = result
    .map(({ name, flags }) => {
      return `<li> <img src="${flags.svg}" alt="${name}" width="50" height="auto">
      <span>${name.official}</span>
      </li>`;
    })
    .join('');
  refs.countryList.innerHTML = listMarkup;
  return listMarkup;
}

function renderFullDescription(result) {
  const cardMarkup = result
    .map(({ flags, name, capital, population, languages }) => {
      return `
      <img src="${flags.svg}" alt="${name}" width="320" height="auto">
      <h2 class="country-info__title"> ${name.official}</h2>
      <p>Capital: <span> ${capital}</span></p>
      <p>Population: <span> ${population}</span></p>
      <p>Languages: <span> ${Object.values(languages).join(', ')}</span></p>`;
    })
    .join('');
  refs.countryInfo.innerHTML = cardMarkup;
  return cardMarkup;
}
