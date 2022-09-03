import './css/styles.css';

import { fetchCountries } from "./fetchCountries";

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const DEBOUNCE_DELAY = 300;

const inputCountryName = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputCountryName.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) { 
    const countryName = e.target.value.trim();
    if (countryName === '') { 
        resetMarkup();
    }
    fetchCountries(countryName).then(renderCountries).catch(error => {
        Notify.failure("Oops, there is no country with that name");
    }); 
}

function renderCountries(countries) { 
    if (countries.length > 10) {
        resetMarkup();
        Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (countries.length > 2 && countries.length <= 10) {
        resetMarkup();
        markupList(countries);
    } else {
        resetMarkup();
        markupInfo(countries);
    } 
}

function resetMarkup() { 
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
}

function markupList(countries) { 
    countryList.innerHTML = countries.map(country => {
        return `<li><img class="country-list__image" src="${country.flags.svg}" alt="flag" width="30"><p class="country-list__name">${country.name.common}</p></li>`
    }).join('');
}

function markupInfo(countries) { 
    countryInfo.innerHTML = countries.map(country => { 
        return `<div class="country-info__header">
        <img class="country-info__image" src="${country.flags.svg}" alt="flag" width="25"><p class="country-info__name">${country.name.official}</p></div><ul><li><span class="country-info__option">Capital:</span>${country.capital}</li><li><span class="country-info__option">Population:</span>${country.population}</li><li><span class="country-info__option">Languages:</span>${Object.values(country.languages)}</li></ul>`
    }).join('');
}
