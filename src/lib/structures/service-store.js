import { Store } from 'klasa';
import Service from './service';

class ServiceStore extends Store {
	constructor(client) {
		super(client, 'services', Service);
	}
}

export default ServiceStore;
