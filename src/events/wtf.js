import { Event }from 'klasa';

module.exports = class extends Event {

	run(data) {
        this.client.services.get('logging').Logger().error(data);
	}

	init() {
		if (!this.client.options.consoleEvents.wtf) this.disable();
	}

};
