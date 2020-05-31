import { Event }from 'klasa';

module.exports = class extends Event {

	run(data) {
        this.client.services.get('logging').Logger().verbose(data);		
	}

	init() {
		if (!this.client.options.consoleEvents.verbose) this.disable();
	}

};
