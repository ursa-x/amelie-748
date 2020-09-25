import fetch from 'node-fetch';
import { upperCase } from 'voca';

import Service from '../lib/structures/service';
import { empty } from '../lib/util/general';
import {
	MADAM_NAZAR_API,
	COLLECTOR_MAP_API
} from '../lib/settings/api';

export default class extends Service {
	constructor(...args) {
		super(...args);

		this.CART_LOCATION = '';
		this.CURRENT_WEEKLY_SET = '';
	}

	async fetchNazarLocation() {
		const self = this;

		return fetch(MADAM_NAZAR_API.currentLocationAPI())
			.then((response) => response.json())
			.then((responseJson) => {
				self._nazarServiceLogger(
					'log',
					'Madam Nazar\'s location fetch success',
					responseJson
				);

				return responseJson;
			})
			.catch((error) => {
				self._nazarServiceLogger('wtf', error);

				return null;
			});
	}

	async fetchCurrentWeeklySet() {
		const self = this;

		return fetch(COLLECTOR_MAP_API.getCurrentWeeklySetAPI())
			.then((response) => response.json())
			.then((responseJson) => {
				self._nazarServiceLogger(
					'log',
					'Madam Nazar\'s Weekly Set fetch success',
					responseJson
				);

				return responseJson.current;
			})
			.catch((error) => {
				self._nazarServiceLogger('wtf', error);

				return null;
			});
	}

	_nazarServiceLogger(level, message, data = {}) {
		const { client } = this;
		let	logMessage = `[${upperCase(this.store.name)}] ${this.name} | ${message}`;

		if (!empty(data)) logMessage += `\n${JSON.stringify(data)}`;

		client.emit(level, logMessage);
	}

	// Fetches cart location from cache
	get todayLocation() {
		return (async (self) => {
			// eslint-disable-next-line max-len, no-param-reassign
			if (!self.CART_LOCATION) self.CART_LOCATION = await self.fetchNazarLocation();

			return self.CART_LOCATION;
		})(this);
	}

	// Fetches cart location from external source
	get freshTodayLocation() {
		return (async (self) => {
			// eslint-disable-next-line max-len, no-param-reassign
			self.CART_LOCATION = await self.fetchNazarLocation();

			return self.CART_LOCATION;
		})(this);
	}

	// Fetches weekly set from cache
	get weeklySet() {
		return (async (self) => {
			// eslint-disable-next-line max-len, no-param-reassign
			if (!self.CURRENT_WEEKLY_SET) self.CURRENT_WEEKLY_SET = await self.fetchCurrentWeeklySet();

			return self.CURRENT_WEEKLY_SET;
		})(this);
	}

	// Fetches weekly set from external source
	get freshWeeklySet() {
		return (async (self) => {
			// eslint-disable-next-line max-len, no-param-reassign
			self.CURRENT_WEEKLY_SET = await self.fetchCurrentWeeklySet();

			return self.CURRENT_WEEKLY_SET;
		})(this);
	}
}
