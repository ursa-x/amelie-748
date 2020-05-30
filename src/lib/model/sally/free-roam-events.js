import {
	titleCase,
	upperCase
} from 'voca';
import CoreModel from '../core/model';
import { data as FREE_ROAM_EVENTS } from '../../../../data/free-roam-events.json';
import {
	DELIMITER,
	QUERY_TYPE
} from '../../settings/general';

class FreeRoamEvents extends CoreModel {
	constructor(message, meta) {
		super(message);

		this.setup();
		this.populateEventSchedule();

		if (typeof meta !== 'undefined') this.meta = meta;
	}

	setup() {
		const queryParams = {
			queryType: QUERY_TYPE.ALL,
			searchQuery: null
		};

		this.eventSchedule = {};
		this.meta = queryParams;
	}

	populateEventSchedule() {
		const self = this,
			EVENT_TIME_POSITION = 0,
			EVENT_NAME_POSITION = 1,
			cleanEventSchedule = (eventsList) => {
				return eventsList.map((freeRoamEvent) => {
					const freeRoamEventName = titleCase(
						freeRoamEvent[EVENT_NAME_POSITION]
							.split(DELIMITER.UNDERSCORE)
							.join(DELIMITER.SPACE)
					);

					return [
						freeRoamEvent[EVENT_TIME_POSITION],
						freeRoamEventName
					];
				});
			};

		for(const [categoryName, schedule] of Object.entries(FREE_ROAM_EVENTS)) {
			self.eventSchedule[categoryName] = cleanEventSchedule(schedule);
		}
	}
}

export default FreeRoamEvents;
