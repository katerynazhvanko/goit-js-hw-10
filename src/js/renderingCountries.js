export function renderFullDescription(result) {
  return result
    .map(({ flags, name, capital, population, languages }) => {
      return `
        <img src="${flags.svg}" alt="${name}" width="320" height="auto">
        <h2 class="country-info__title"> ${name.official}</h2>
        <p>Capital: <span> ${capital}</span></p>
        <p>Population: <span> ${population}</span></p>
        <p>Languages: <span> ${Object.values(languages).join(', ')}</span></p>`;
    })
    .join('');
}

export function renderSmallDescription(result) {
  return result
    .map(({ name, flags }) => {
      return `<li> <img src="${flags.svg}" alt="${name}" width="50" height="auto">
        <span>${name.official}</span>
        </li>`;
    })
    .join('');
}
