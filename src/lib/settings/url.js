/* eslint one-var: "off" */

export const MADAM_NAZAR_API = {
	DOMAIN: 'https://madam-nazar-location-api-2.herokuapp.com',

	currentLocationAPI() {
		return `${this.DOMAIN}/location/current`;
	}
};

export const COLLECTOR_MAP_API = {
	DOMAIN: 'https://jeanropke.github.io',

	getCurrentWeeklySetAPI() {
		return `${this.DOMAIN}/RDR2CollectorsMap/data/weekly.json?nocache=1407`;
	}
};
