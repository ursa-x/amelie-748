const moment = require('moment');

class CoreModel {
	constructor(message) {
		this.setup(message);
	}

	setup(message) {
		this.originMessage = message;
		this.originUser = message.author;
		this.createdTime = moment().toDate();
		this.meta = {};
	}
}

module.exports = CoreModel;
