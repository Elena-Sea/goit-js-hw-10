import './css/styles.css';

import { fetchCountries } from "./fetchCountries";

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const DEBOUNCE_DELAY = 300;

const inputCountryName = document.querySelector('input#search-box');
console.log(inputCountryName);

inputCountryName.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) { 
    const countryName = e.target.value;
    console.log(countryName);
    fetchCountries(countryName).then(renderCountriesList).finally(resetInput);  
}

function renderCountriesList() { 

}

function resetInput() { 

}