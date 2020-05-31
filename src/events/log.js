import { Event } from 'klasa';

module.exports = class extends Event {
	run(data) {
		this.client.services.get('logging').logger.info(data);
	}

	init() {
		if (!this.client.options.consoleEvents.error) this.disable();
	}
};
