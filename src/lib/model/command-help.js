import { util } from 'klasa';
import CoreModel from './core/model';

const { isFunction } = util;

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

	get requiredPermissions() {
		const { command } = this;

		return command.requiredPermissions.toArray();
	}
}

export default CommandHelp;
