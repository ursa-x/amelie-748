import { titleCase } from 'voca';
import CoreModel from '../core/model';
import { data as FREE_ROAM_EVENTS } from '../../../../data/free-roam-events.json';
import {
	DELIMITER,
	QUERY_TYPE
} from '../../settings/general';
import {CATEGORY_NAMES} from "../../settings/sally/free-roam-events";

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
		const self = this;

		for (const [categoryName, schedule] of Object.entries(FREE_ROAM_EVENTS)) {
			self.eventSchedule[categoryName] = (categoryName === CATEGORY_NAMES.ROLE)
				? this.cleanRoleEventSchedule(schedule)
				: this.cleanEventSchedule(schedule);
		}
	}

	cleanEventSchedule(eventsList) {
		const EVENT_TIME_POSITION = 0,
			EVENT_NAME_POSITION = 1;

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
	}

	cleanRoleEventSchedule(roleEventsList) {
		const EVENT_TIME_POSITION = 0,
			EVENT_NAME_POSITION = 1,
			ROLE_POSITION = 2,
			cleanKey = (key) => titleCase(
				key
					.split(DELIMITER.UNDERSCORE)
					.join(DELIMITER.SPACE)
			);

		return roleEventsList.map((freeRoamEvent) => {
			const freeRoamEventName = cleanKey(freeRoamEvent[EVENT_NAME_POSITION]),
				roleName = cleanKey(freeRoamEvent[ROLE_POSITION]);

			return [
				freeRoamEvent[EVENT_TIME_POSITION],
				freeRoamEventName,
				roleName
			];
		});
	}
}

export default FreeRoamEvents;
