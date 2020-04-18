/* Module Imports */

const moment = require('moment');
const {
	titleCase,
	lowerCase
} = require('voca');
const CoreModel = require('core/model');
const { DATE } = require('../settings/formats');
const WEEKLY_SETS = require('../settings/nazar/weekly-sets');

/* Common */

const COLLECTOR_ITEM_EMOJI = {
	arrowhead: ':bow_and_arrow:',
	bottle: ':champagne:',
	coin: ':secret:',
	egg: ':egg:',
	flower: ':white_flower:',
	heirlooms: ':gem:',
	bracelets: ':o:',
	earring: '',
	ring: ':ring:',
	cups: ':flower_playing_cards:',
	wands: ':flower_playing_cards:',
	pentacles: ':flower_playing_cards:',
	swords: ':flower_playing_cards:',
	item: ':stopwatch:'
};

const fixTitleCase = (text) => titleCase(lowerCase(text));

/* Model Definitions */

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

class WeeklySets extends CoreModel {
	constructor(message) {
		super(message);

		this.chests = {};
		this.populateWeeklySets();
	}

	populateWeeklySets() {
		const self = this,
			itemSelector = 'items',
			DELIMITER_ITEM_DESCRIPTOR = '-',
			DELIMITER_SPACE = ' ',
			SET_TYPE_POSITION = 0;

		for (let [setName, itemObjects] of Object.entries(WEEKLY_SETS)) {
			self.chests[setName] = itemObjects.map((itemObject) => {
				const itemDescriptorParts = itemObject[itemSelector].split(DELIMITER_ITEM_DESCRIPTOR);

				itemDescriptorParts[SET_TYPE_POSITION] = COLLECTOR_ITEM_EMOJI[itemDescriptorParts[SET_TYPE_POSITION]];

				return itemDescriptorParts.join(DELIMITER_SPACE);
			});
		}
	}
}

module.exports = {
	Location,
	WeeklySets
} ;
