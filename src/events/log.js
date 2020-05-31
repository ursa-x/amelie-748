import { Event }from 'klasa';

module.exports = class extends Event {

	run(data) {		
        this.client.services.get('logging').Logger().info(data);
	}

	init() {
		if (!this.client.options.consoleEvents.error) this.disable();
	}

};