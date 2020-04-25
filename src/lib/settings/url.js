const MADAM_NAZAR_API = {
	DOMAIN: 'https://madam-nazar-location-api-2.herokuapp.com',

	currentLocationAPI() {
		return `${this.DOMAIN}/location/current`;
	}
};

const COLLECTOR_MAP_API = {
	DOMAIN: 'https://jeanropke.github.io',

	getCurrentWeeklySetAPI() {
		return `${this.DOMAIN}/RDR2CollectorsMap/data/weekly.json?nocache=1407`
	}
};

module.exports = {
	MADAM_NAZAR_API,
	COLLECTOR_MAP_API
};
