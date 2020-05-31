import { Event }from 'klasa';

module.exports = class extends Event {

	run(data) {
        this.client.services.get('logging').Logger().debug(data);	
	}

	init() {
		if (!this.client.options.consoleEvents.debug) this.disable();
	}

};
