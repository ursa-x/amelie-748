import { Event }from 'klasa';
import { Logger } from '../lib/util/logging';
module.exports = class extends Event {

	run(data) {
        Logger.warn(data);		
	}

	init() {
		if (!this.client.options.consoleEvents.warn) this.disable();
	}

};
