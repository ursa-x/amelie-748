const moment = require('moment');

class CoreModel {
	constructor(message) {
		this.originMessage = message;
		this.originUser = message.author;
		this.createdTime = moment().toDate();
	}
}

module.exports = CoreModel;
