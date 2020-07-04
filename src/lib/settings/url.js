/* eslint one-var: "off" */
import properties from '../../../config/properties.json';

export const MADAM_NAZAR_API = {
	DOMAIN: properties.url.madam_nazar_api_domain,

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
