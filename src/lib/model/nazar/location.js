import moment from 'moment';
import {
	titleCase,
	lowerCase
} from 'voca';
import CoreModel from '../core/model';
import { fixTitleCase } from '../../util/message';
import { DATE } from '../../settings/formats';

class Location extends CoreModel {
	constructor(locationJson, message) {
		super(message);
		this.locationJson = locationJson;
	}

	get state() {
		const regionName = this.locationJson.data.location.region.name;

		return fixTitleCase(regionName);
	}

	get region() {
		const preciseRegion = this.locationJson.data.location.region.precise;

		return fixTitleCase(preciseRegion);
	}

	get landmarks() {
		const landmarksJson = this.locationJson.data.location.near_by,
			fixedLandmarks = Array.isArray(landmarksJson) ? landmarksJson.map(lowerCase) : landmarksJson,
			landmarks = fixedLandmarks.map(titleCase);

		return landmarks;
	}

	get imageURL() {
		return this.locationJson.data.location.image;
	}

	get currentDate() {
		const dateString = this.locationJson.dataFor,
			nazarLocationCurrentDate = dateString
				? moment(dateString, DATE.NAZAR.LOCATION_TODAY)
				: moment();

		return nazarLocationCurrentDate.format(DATE.DAY_LL);
	}
}

module.exports = Location;
