export default class CountryService {
	constructor() {
		this.name = '';
	}


	fetchCountries() {
		const url = `https://restcountries.com/v3.1/name/${this.name}?fields=name,capital,population,flags,languages`;
		console.log(url);

		return fetch(url)
		.then(r => r.json())
		.then(countries => {
			console.log(countries);
			return countries;
		});
	}
}