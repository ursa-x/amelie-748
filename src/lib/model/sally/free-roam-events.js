import { Collection} from "discord.js";
import { titleCase } from 'voca';
import CoreModel from '../core/model';
import { data as FREE_ROAM_EVENTS } from '../../../../data/free-roam-events.json';
import {
	DELIMITER,
	QUERY_TYPE
} from '../../settings/general';
import {
	CATEGORY_NAMES,
	SCHEDULE_ITEM_POSITION_ENUM
} from "../../settings/sally/free-roam-events";

const cleanKey = (key) => titleCase(
	key
		.split(DELIMITER.UNDERSCORE)
		.join(DELIMITER.SPACE)
);

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

		this.eventSchedule = new Collection();
		this.meta = queryParams;
	}

	populateEventSchedule() {
		const self = this;

		for (const [categoryName, schedule] of Object.entries(FREE_ROAM_EVENTS)) {
			self.eventSchedule.set(categoryName, (categoryName === CATEGORY_NAMES.ROLE)
				? this.cleanRoleEventSchedule(schedule)
				: this.cleanEventSchedule(schedule)
			);
			// self.eventSchedule[categoryName] = (categoryName === CATEGORY_NAMES.ROLE)
			// 	? this.cleanRoleEventSchedule(schedule)
			// 	: this.cleanEventSchedule(schedule);
		}
	}

	cleanEventSchedule(eventsList) {
		const {
				EVENT_TIME: EVENT_TIME_POSITION,
				EVENT_NAME: EVENT_NAME_POSITION
			} = SCHEDULE_ITEM_POSITION_ENUM,
			eventSchedule = new Collection();

		eventsList.forEach((freeRoamEvent) => {
			const freeRoamEventTime = freeRoamEvent[EVENT_TIME_POSITION],
				freeRoamEventName = cleanKey(freeRoamEvent[EVENT_NAME_POSITION]);

			eventSchedule.set(
				freeRoamEventTime,
				{ name: freeRoamEventName }
			);
		});

		return eventSchedule;
	}

	cleanRoleEventSchedule(roleEventsList) {
		const {
				EVENT_TIME: EVENT_TIME_POSITION,
				EVENT_NAME: EVENT_NAME_POSITION,
				ROLE_NAME: ROLE_NAME_POSITION
			} = SCHEDULE_ITEM_POSITION_ENUM,
			roleEventSchedule = new Collection();

		roleEventsList.forEach((freeRoamEvent) => {
			const freeRoamEventTime = freeRoamEvent[EVENT_TIME_POSITION],
				freeRoamEventName = cleanKey(freeRoamEvent[EVENT_NAME_POSITION]),
				roleName = cleanKey(freeRoamEvent[ROLE_NAME_POSITION]);

			roleEventSchedule.set(
				freeRoamEventTime,
				{
					name: freeRoamEventName,
					role: roleName
				}
			);
		});

		return roleEventSchedule;
	}
}

export default FreeRoamEvents;
