import fetch from 'node-fetch';

import Service from '../lib/structures/service';
import {
	MADAM_NAZAR_API,
	COLLECTOR_MAP_API
} from '../lib/settings/url';

export default class extends Service {
	constructor(...args) {
		super(...args);

		this.CART_LOCATION = '';
		this.CURRENT_WEEKLY_SET = '';
	}

	static async fetchNazarLocation() {
		return fetch(MADAM_NAZAR_API.currentLocationAPI())
			.then((response) => response.json())
			.then((responseJson) => responseJson)
			.catch((error) => {
				super.client.emit('wtf', error);
				return null;
			});
	}

	static async fetchCurrentWeeklySet() {
		return fetch(COLLECTOR_MAP_API.getCurrentWeeklySetAPI())
			.then((response) => response.json())
			.then((responseJson) => responseJson.current)
			.catch((error) => {
				super.client.emit('wtf', error);
				return null;
			});
	}

	get todayLocation() {
		return (async (self) => {
			// eslint-disable-next-line max-len, no-param-reassign
			if (!self.CART_LOCATION) self.CART_LOCATION = await self.constructor.fetchNazarLocation();

			return self.CART_LOCATION;
		})(this);
	}


	get weeklySet() {
		return (async (self) => {
			// eslint-disable-next-line max-len, no-param-reassign
			if (!self.CURRENT_WEEKLY_SET) self.CURRENT_WEEKLY_SET = await self.constructor.fetchCurrentWeeklySet();

			return self.CURRENT_WEEKLY_SET;
		})(this);
	}
}
