import { Task } from 'klasa';
import { fetchCurrentWeeklySet } from '../lib/util/nazar';

class FetchNazarWeeklySet extends Task {
	async run() {
		await this._fetchNazarWeeklySet();
	}

	async init() {
		await this._fetchNazarWeeklySet();
	}

	async _fetchNazarWeeklySet() {
		try {
			this.client._NAZAR = {
				WEEKLY_SET: await fetchCurrentWeeklySet()
			};
		} catch (error) {
			// TODO: Handle task failure?
			this.client.emit('wtf', error);
		}
	}
}

export default FetchNazarWeeklySet;
