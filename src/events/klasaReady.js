/*
	Cron Schedule Expressions
	https://crontab.guru
*/

const { Event } = require('klasa');

// TODO: Log schedule success/failure?
module.exports = class extends Event {
	constructor(...args) {
		super(...args, {
			name: 'klasaReady',
			once: true
		});
	}

	async run() {
		try {
			this.initNazarTasks();
		} catch (error) {
			this.client.console.wtf(error);
		}
	}

	async initNazarTasks() {
		try {
			await this.initNazarLocationTask()
				.catch((error) => this.client.emit('wtf', error));
			await this.initNazarWeeklySetTask()
				.catch((error) => this.client.emit('wtf', error));
		} catch (error) {
			this.client.console.wtf(error);
		}
	}

	// Get Madam Nazar's location everyday at 7:15 AM GMT
	async initNazarLocationTask() {
		const { tasks } = this.client.schedule,
			nazarTaskName = 'fetchNazarLocation';

		if (!tasks.some(task => task.taskName === nazarTaskName)) {
			await this.client.schedule.create(nazarTaskName, '15 7 * * *', {});
		}
	}

	// Get Madam Nazar's weekly set every Tuesday at 6:30 AM GMT
	async initNazarWeeklySetTask() {
		const { tasks } = this.client.schedule,
			nazarTaskName = 'fetchNazarWeeklySet';

		if (!tasks.some(task => task.taskName === nazarTaskName)) {
			await this.client.schedule.create(nazarTaskName, '30 6 * * 2', {});
		}
	}
};
