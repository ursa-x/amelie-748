import { Event }from 'klasa';
import { Logger } from '../lib/util/logging';
module.exports = class extends Event {

	run(data) {
        Logger.debug(data);		
	}

	init() {
		if (!this.client.options.consoleEvents.debug) this.disable();
	}

};