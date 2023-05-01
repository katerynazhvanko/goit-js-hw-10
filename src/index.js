import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

import fetchCountries from './js/fetchCountries';
import {
  renderFullDescription,
  renderSmallDescription,
} from './js/renderingCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

hiddenInformation();

refs.searchInput.addEventListener(
  'input',
  debounce(onInputSearch, DEBOUNCE_DELAY)
);

function onInputSearch(event) {
  event.preventDefault();

  const searchCountries = event.target.value.trim();

  if (!searchCountries) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    hiddenInformation();
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
      clearInformation();
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderingCountries(result) {
  const inputLetters = result.length;

  if (inputLetters === 1) {
    refs.countryList.innerHTML = '';
    refs.countryList.style.visibility = 'hidden';
    refs.countryInfo.style.visibility = 'visible';
    refs.countryInfo.innerHTML = renderFullDescription(result);
  }

  if (inputLetters > 2 && inputLetters <= 10) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.style.visibility = 'visible';
    refs.countryInfo.style.visibility = 'hidden';
    refs.countryList.innerHTML = renderSmallDescription(result);
  }
}

function hiddenInformation() {
  refs.countryList.style.visibility = 'hidden';
  refs.countryInfo.style.visibility = 'hidden';
}
function clearInformation() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
