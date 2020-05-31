import Service from '../lib/structures/service';
import { Logger } from '../lib/plugins/winston';


export default class extends Service {
	constructor(...args) {
		super(...args);
	}

	Logger() {
		return Logger;
	}
}
