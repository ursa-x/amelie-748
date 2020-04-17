class CoreModel {
	constructor(message) {
		this.originMessage = message;
		this.originUser = message.author;
	}
}

module.exports = CoreModel;
