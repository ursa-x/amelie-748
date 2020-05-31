import { Event }from 'klasa';

module.exports = class extends Event {

	run(data) {
        this.client.services.get('logging').logger.debug(data);	
	}

	init() {
		if (!this.client.options.consoleEvents.debug) this.disable();
	}

};
