/* eslint max-classes-per-file: ["error", 2] */

/* Module Imports */

const moment = require('moment');
const {
	titleCase,
	lowerCase,
	upperCase
} = require('voca');
const CoreModel = require('./core/model');
const { DATE } = require('../settings/formats');
const WEEKLY_SETS = require('../settings/nazar/weekly-sets');

/* Common */

/*
	Emoji Reference
	https://emoji.muan.co
*/
const COLLECTOR_ITEM_EMOJI = {
		ARROWHEAD: ':bow_and_arrow:',
		BOTTLE: ':champagne:',
		COIN: ':secret:',
		EGG: ':egg:',
		FLOWER: ':cherry_blossom:',
		HEIRLOOMS: ':fleur_de_lis:',
		BRACELET: ':o:',
		EARRING: ':sparkles:',
		RING: ':ring:',
		NECKLACE: ':prayer_beads:',
		CUPS: ':trophy:',
		WANDS: ':crystal_ball:',
		PENTACLES: ':trident:',
		SWORDS: ':crossed_swords:',
		ITEM: ':pick:'
	},
	fixTitleCase = (text) => titleCase(lowerCase(text));

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
			itemSelector = 'item',
			DELIMITER_CODE_DESCRIPTOR = '_',
			DELIMITER_SPACE = ' ',
			SET_TYPE_POSITION = 0;

		for (const [setCode, itemObjects] of Object.entries(WEEKLY_SETS)) {
			const setName = titleCase(
				setCode
					.split(DELIMITER_CODE_DESCRIPTOR)
					.join(DELIMITER_SPACE)
			);

			self.chests[setName] = itemObjects.map((itemObject) => {
				const itemDescriptorParts = itemObject[itemSelector]
					.split(DELIMITER_CODE_DESCRIPTOR)
					.map(titleCase);

				itemDescriptorParts[SET_TYPE_POSITION] = COLLECTOR_ITEM_EMOJI[upperCase(
					itemDescriptorParts[SET_TYPE_POSITION]
				)];

				return itemDescriptorParts.join(DELIMITER_SPACE);
			});
		}
	}
}

module.exports = {
	Location,
	WeeklySets
};
