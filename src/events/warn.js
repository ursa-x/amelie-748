import { Event }from 'klasa';

module.exports = class extends Event {

	run(data) {
        this.client.services.get('logging').logger.warn(data);
	}

	init() {
		if (!this.client.options.consoleEvents.warn) this.disable();
	}

};
