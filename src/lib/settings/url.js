const MADAM_NAZAR_API = {
	DOMAIN: 'https://madam-nazar-location-api-2.herokuapp.com',

	currentLocationAPI() {
		return `${this.DOMAIN}/location/current`;
	}
};

module.exports = MADAM_NAZAR_API;
