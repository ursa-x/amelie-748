const {
	titleCase,
	upperCase
} = require('voca');
const CoreModel = require('../core/model');
const WEEKLY_SETS = require('../../settings/nazar/weekly-sets');
const COLLECTIBLE_EMOJI = require('../../settings/nazar/collectible');
const {
	DELIMITER,
	QUERY_TYPE
} = require('../../settings/general');

class WeeklySets extends CoreModel {
	constructor(message, meta) {
		super(message);

		this.setup();
		this.populateWeeklySets();

		if (typeof meta !== 'undefined') {
			this.meta = meta;
			this.currentSetName = this.meta.currentSetName;
		}
	}

	setup() {
		const queryParams = {
			queryType: QUERY_TYPE.ALL,
			currentSetName: null,
			searchSetName: null
		};

		this.chests = {};
		this.meta = queryParams;
	}

	populateWeeklySets() {
		const self = this,
			itemSelector = 'item',
			SET_TYPE_POSITION = 0;

		for (const [setCode, itemObjects] of Object.entries(WEEKLY_SETS)) {
			const setName = titleCase(
				setCode
					.split(DELIMITER.UNDERSCORE)
					.join(DELIMITER.SPACE)
			);

			self.chests[setName] = itemObjects.map((itemObject) => {
				const itemDescriptorParts = itemObject[itemSelector]
					.split(DELIMITER.UNDERSCORE)
					.map(titleCase);

				itemDescriptorParts[SET_TYPE_POSITION] = COLLECTIBLE_EMOJI[upperCase(
					itemDescriptorParts[SET_TYPE_POSITION]
				)];

				return itemDescriptorParts.join(DELIMITER.SPACE);
			});
		}
	}
}

module.exports = WeeklySets;
