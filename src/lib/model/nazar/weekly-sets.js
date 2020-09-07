import { Collection } from 'discord.js';
import {
	titleCase,
	upperCase
} from 'voca';
import CoreModel from '../core/model';
import { getTitleCaseFromSnakeCase } from '../../util/message';
import { data as WEEKLY_SETS } from '../../../../data/weekly-sets.json';
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

		this.chests = new Collection();
		this.meta = queryParams;
	}

	populateWeeklySets() {
		const self = this;

		for (const [setCode, setObject] of Object.entries(WEEKLY_SETS)) {
			//TODO Probably consume snake case since the idea is to i18n anyways
			const setName = getTitleCaseFromSnakeCase(setCode);

			self.chests.set(
				setName,
				self.getSetItemsList(setObject.items)
			);
		}
	}

	getSetItemsList(items) {
		const SET_TYPE_POSITION = 0;

		return items.map((item) => {
			const itemLabel = item
				.split(DELIMITER.UNDERSCORE)
				.map(titleCase);

			itemLabel[SET_TYPE_POSITION] = COLLECTIBLE_EMOJI[
					upperCase(itemLabel[SET_TYPE_POSITION])
				];

			return itemLabel.join(DELIMITER.SPACE);
		});
	}
}

export default WeeklySets;
