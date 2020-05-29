import { Task } from 'klasa';

class FetchNazarWeeklySet extends Task {
	async run() {
		await this._fetchNazarWeeklySet();
	}

	async init() {
		await this._fetchNazarWeeklySet();
	}

	async _fetchNazarWeeklySet() {
		let currentWeeklySet = null;

		try {
			const NazarService = this.client.services.get('nazar');
			currentWeeklySet = NazarService.weeklySet;
		} catch (error) {
			// TODO: Handle task failure?
			this.client.emit('wtf', error);
		}

		return currentWeeklySet;
	}
}

export default FetchNazarWeeklySet;
