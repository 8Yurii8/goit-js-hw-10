// Імпорт стилі
import './css/styles.css';
// Імпорт стилі

// Імпорт ліби
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// Імпорт ліби

// Імпорт fetch
import { fetchCountries } from './fetchCountries';
// Імпорт fetch

const DEBOUNCE_DELAY = 300;

const inputHandleText = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
inputHandleText.addEventListener(
  'input',
  debounce(event => {
    const countriesPromise = fetchCountries(event.target.value.trim());
    countriesPromise
      .then(countries => {
        // перевірка на максимум
        if (countries.length >= 10) {
          return Notiflix.Notify.info(
            `Too many matches found. Please enter a more specific name.`
          );
        }
        // перевірка на максимум

        // більше двох
        const countryListHTML = createCountryList(countries);
        countryList.innerHTML = countryListHTML;
        applyCountryListStyles();

        // очищує info
        if (countries.length > 2) {
          countryInfo.innerHTML = '';
          return;
        }
        // очищує info
        // більше двох

        // одна країна
        if (countries.length < 2) {
          const countryInfoHTML = createCountryInfo(countries);
          countryInfo.innerHTML = countryInfoHTML;
          applyCountryIteamStyles();
        }
      })
      .catch(error => {
        Notiflix.Notify.failure(`Oops, there is no country with that name`);
      })
      .finally(() => {
        // Очищує список
        if (event.target.value === '') {
          countryList.innerHTML = '';
          return;
        }
        // Очищує список
      });
  }, DEBOUNCE_DELAY)
);
// додаємо li
function createCountryList(countries) {
  return countries
    .map(({ flags, name }) => {
      return `<li class="country-list-iteam"><span><img src="${flags.svg}" height="30" width="30" /></span>${name.official}</li>`;
    })
    .join('');
}
// додаємо li

// додаємо div
function createCountryInfo(countriesInfo) {
  return countriesInfo
    .map(({ capital, population, languages }) => {
      const languageValues = Object.values(languages).join(', ');
      return `<p class="courtry__info-text">Capital:<span class="courtry__info-iteam">${capital}</span></p><p class="courtry__info-text">Population:<span class="courtry__info-iteam">${population}</span></p><p class="courtry__info-text">Languages:<span class="courtry__info-iteam">${languageValues}</span></p>`;
    })
    .join('');
}
// додаємо div

// додаємо стилі до ul
countryList.style.paddingLeft = '0';

function applyCountryListStyles() {
  // стилі до li
  const countryListItems = document.querySelectorAll('.country-list-iteam');
  countryListItems.forEach(item => {
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.gap = '20px';
    item.style.fontWeight = '1000';
    item.style.fontSize = 'x-large';
  });
  // стилі до li
}
// додаємо стилі до li

// додаємо стилі до div
function applyCountryIteamStyles() {
  // стиль для span
  const countryInfoIteam = document.querySelectorAll('.courtry__info-iteam');
  countryInfoIteam.forEach(item => {
    item.style.marginLeft = '5px';
    item.style.fontWeight = '400';
  });
  // стиль для span

  // стиль для P
  const countryInfoText = document.querySelectorAll('.courtry__info-text');
  countryInfoText.forEach(item => {
    item.style.fontWeight = '1000';
  });
  // стиль для P
}
// додаємо стилі до div
