const { KlasaConsole: console } = require('klasa');
const fetch = require('node-fetch');
const {
	MADAM_NAZAR_API,
	COLLECTOR_MAP_API
} = require('../settings/url');

// TODO: Log the fetch success/failure
const NazarUtil = {
	async fetchNazarLocation() {
		return await fetch(MADAM_NAZAR_API.currentLocationAPI())
			.then((response) => response.json())
			.then((responseJson) => responseJson)
			.catch((err) => {
				console.error(err)
				return null;
			});
	},

	async fetchCurrentWeeklySet() {
		return await fetch(COLLECTOR_MAP_API.getCurrentWeeklySetAPI())
			.then((response) => response.json())
			.then((responseJson) => responseJson.current)
			.catch((err) => {
				console.error(err);
				return null;
			});
	}
};

module.exports = NazarUtil;
