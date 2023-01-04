import { debounce } from 'lodash';
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

  countryService.name = e.target.value;
  console.log(e.target.value);
  countryService.fetchCountries().then(appendCountryMarkup);
}

function appendCountryMarkup(countries) {

  if(countries.length > 1){
	const listEl = countries.map((country) => {
		return `<div class = "country-list">
		<img src="${country.flags.svg}" height = 20px, width = 20px>
		<span class = "name">${country.name.official}</span>
		</div>`;
	  });
	  refs.countryList.insertAdjacentHTML('beforeend', listEl.join(""));
  } else {
	const countryEl = countries.map((country) => {
		return `<div class = "country">
		<img src="${country.flags.svg}" height = 30px, width = 40px>
		<span class = "country-name">${country.name.official}</span>
		<p class="capital">Capital: ${country.capital}</p>
		<p class="population">Population: ${country.population}</p>
		<p class="language">Language: ${country.languages.keys}</p>
		</div>`;
	  });
	  refs.countryInfo.insertAdjacentHTML('beforeend', countryEl)
  }

  
}
