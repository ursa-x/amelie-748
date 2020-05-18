const { util: { isFunction } } = require('klasa');
const CoreModel = require('./core/model');

class CommandHelp extends CoreModel {
	constructor(command, message) {
		super(message);
		this.command = command;
	}

	get name() {
		return this.command.name;
	}

	get description() {
		const {
			originMessage,
			command
		} = this;

		return isFunction(command.description)
			? command.description(originMessage.language)
			: command.description;
	}

	get usage() {
		const {
			originMessage,
			command
		} = this;

		return command.usage.fullUsage(originMessage);
	}

	get extendedHelp() {
		const {
			originMessage,
			command
		} = this;

		return isFunction(command.extendedHelp)
			? command.extendedHelp(originMessage.language)
			: command.extendedHelp;
	}
}

module.exports = CommandHelp;
