const {
	titleCase,
	upperCase
} = require('voca');
const CoreModel = require('../core/model');
const WEEKLY_SETS = require('../../settings/nazar/weekly-sets');
const COLLECTIBLE_EMOJI = require('../../settings/nazar/collectible');
const { QUERY_TYPE } = require('../../settings/general');

class WeeklySets extends CoreModel {
	constructor(message, options) {
		super(message);

		this.setup();
		this.populateWeeklySets();

		if (typeof options !== 'undefined') {
			// TODO: Use 'meta' prop to store options instead
			this.options = options;
			this.currentSetName = this.options.currentSetName;
		}
	}

	setup() {
		this.chests = {};
		this.options = {
			queryType: QUERY_TYPE.ALL,
			currentSetName: null,
			searchSetName: null
		};
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

				itemDescriptorParts[SET_TYPE_POSITION] = COLLECTIBLE_EMOJI[upperCase(
					itemDescriptorParts[SET_TYPE_POSITION]
				)];

				return itemDescriptorParts.join(DELIMITER_SPACE);
			});
		}
	}
}

module.exports = WeeklySets;
