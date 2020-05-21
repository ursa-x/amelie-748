import { Task } from 'klasa';
import { fetchNazarLocation } from '../lib/util/nazar';

class FetchNazarLocation extends Task {
	async run() {
		await this._fetchNazarLocation();
	}

	async init() {
		await this._fetchNazarLocation();
	}

	async _fetchNazarLocation() {
		try {
			this.client._NAZAR = {
				LOCATION: await fetchNazarLocation()
			};
		} catch (error) {
			// TODO: Handle task failure?
			this.client.emit('wtf', error);
		}
	}
}

export default FetchNazarLocation;
