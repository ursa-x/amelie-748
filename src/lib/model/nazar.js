const moment = require('moment');
const titleCase = require('voca/title_case');
const { DATE } = require('../settings/formats');

class Location {
	constructor(locationJson) {
		this.locationJson = locationJson;
	}

	get state() {
		return titleCase(this.locationJson.data.location.region.name);
	}

	get region() {
		return titleCase(this.locationJson.data.location.region.precise);
	}

	get landmarks() {
		const landmarksJson = this.locationJson.data.location.near_by,
			landmarks = Array.isArray(landmarksJson) ? landmarksJson.map(titleCase) : landmarksJson;

		return landmarks;
	}

	get imageURL() {
		return this.locationJson.data.location.image;
	}

	get currentDate() {
		const dateString = this.locationJson.dataFor,
		nazarLocationCurrentDate = dateString ? moment(dateString, DATE.NAZAR.LOCATION_TODAY) : moment();

		return nazarLocationCurrentDate.format(DATE.DAY_LL);
	}
}

module.exports = Location;
