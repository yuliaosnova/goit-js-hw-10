import { debounce } from 'lodash';
import Notiflix from 'notiflix';

import CountryService from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 1000;
const refs = {
  searchForm: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const countryService = new CountryService();
// console.log(countryService);

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();

  countryService.name = e.target.value.trim();
  console.log(countryService.name);

  if (countryService.name === '') {
    clearCountryContainer();
    return;
  }

  countryService.fetchCountries().then(countries => {
		clearCountryContainer();
		appendCountryMarkup(countries)})
    .catch(error => {
		console.log(error);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function appendCountryMarkup(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length > 2 && countries.length <= 10) {
	const listEl = countries.map(country => {
		return `<li class = "country_list">
			  <img src="${country.flags.svg}" height = 20px, width = 20px>
			  <span class = "name">${country.name.official}</span>
			  </li>`;
	 });
	 refs.countryList.insertAdjacentHTML('beforeend', listEl.join(''));
  } else {
	const countryEl = countries.map(country => {
		const languageKey = Object.keys(country.languages)[0];
  
		return `<div class = "country_info">
		  <img src="${country.flags.svg}" height = 30px, width = 40px>
		  <span class = "country-name">${country.name.official}</span>
		  <p class="capital">Capital: ${country.capital}</p>
		  <p class="population">Population: ${country.population}</p>
		  <p class="language">Language: ${country.languages[languageKey]}</p>
		  </div>`;
	 });
	 refs.countryInfo.insertAdjacentHTML('beforeend', countryEl);
  }
}


function clearCountryContainer() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
