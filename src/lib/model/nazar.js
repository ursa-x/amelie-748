const titleCase = require('voca/title_case');

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
		return this.locationJson.dataFor;
	}
}

module.exports = Location;
