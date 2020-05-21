import moment from 'moment';

class CoreModel {
	constructor(message) {
		this.coreSetup(message);
	}

	coreSetup(message) {
		this.originMessage = message;
		this.originUser = message.author;
		this.createdTime = moment().toDate();
		this.meta = {};
	}
}

export default CoreModel;
