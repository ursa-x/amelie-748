import {
	titleCase,
	upperCase
} from 'voca';
import CoreModel from '../core/model';
import WEEKLY_SETS from '../../settings/nazar/weekly-sets.json';
import COLLECTIBLE_EMOJI from '../../settings/nazar/collectible';
import {
	DELIMITER,
	QUERY_TYPE
} from '../../settings/general';

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
			// itemSelector = 'item',
			SET_TYPE_POSITION = 0;

		for (const [setCode, setObject] of Object.entries(WEEKLY_SETS)) {
			const setName = titleCase(
				setCode
					.split(DELIMITER.UNDERSCORE)
					.join(DELIMITER.SPACE)
			);

			self.chests[setName] = setObject.items.map((item) => {
				const itemLabel = item
					.split(DELIMITER.UNDERSCORE)
					.map(titleCase);

				itemLabel[SET_TYPE_POSITION] = COLLECTIBLE_EMOJI[upperCase(
					itemLabel[SET_TYPE_POSITION]
				)];

				return itemLabel.join(DELIMITER.SPACE);
			});

			// self.chests[setName] = itemObjects.map((itemObject) => {
			// 	const itemDescriptorParts = itemObject[itemSelector]
			// 		.split(DELIMITER.UNDERSCORE)
			// 		.map(titleCase);
			//
			// 	itemDescriptorParts[SET_TYPE_POSITION] = COLLECTIBLE_EMOJI[upperCase(
			// 		itemDescriptorParts[SET_TYPE_POSITION]
			// 	)];
			//
			// 	return itemDescriptorParts.join(DELIMITER.SPACE);
			// });
		}
	}
}

export default WeeklySets;
