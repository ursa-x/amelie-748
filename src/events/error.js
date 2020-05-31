import { Event }from 'klasa';

module.exports = class extends Event {

	run(data) {
        this.client.services.get('logging').logger.error(data);	
	}

	init() {
		if (!this.client.options.consoleEvents.log) this.disable();
	}

};
