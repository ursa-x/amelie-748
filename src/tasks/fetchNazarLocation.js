import { Task } from 'klasa';

class FetchNazarLocation extends Task {
	async run() {
		await this._fetchNazarLocation();
	}

	async init() {
		await this._fetchNazarLocation();
	}

	async _fetchNazarLocation() {
		let todayLocation = null;

		try {
			const NazarService = this.client.services.get('nazar');
			todayLocation = NazarService.todayLocation;
		} catch (error) {
			// TODO: Handle task failure?
			this.client.emit('wtf', error);
		}

		return todayLocation;
	}
}

export default FetchNazarLocation;
