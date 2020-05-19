/*
	Klasa core command piece (v0.5.0-dev)
 	General > Chat Bot Info > help.js
*/

const { Command } = require('klasa');
const { DELIMITER } = require('../../lib/settings/general');
const HelpModel = require('../../lib/model/help');
const CommandHelpModel = require('../../lib/model/command-help');
const HelpView = require('../../lib/view/help');
const CommandHelpView = require('../../lib/view/command-help');
const { has } = require('../../lib/util/general');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: 'help',
			aliases: ['commands'],
			guarded: true,
			description: (language) => language.get('COMMAND_HELP_DESCRIPTION'),
			usage: '(Command:command)'
		});

		this.createCustomResolver('command', (arg, possible, message) => {
			if (!arg || arg === DELIMITER.EMPTY_STRING) return null;

			return this.client.arguments.get('command').run(arg, possible, message);
		});
	}

	async run(message, [command]) {
		if (command) {
			const commandHelpReply = this.createCommandHelpEmbed(message, command);

			return message.send({
				files: commandHelpReply.messageAttachments,
				embed: commandHelpReply.messageEmbed
			});
		}

		const {
				commands,
				inhibitors
			} = this.client,
			catalogue = await this.buildHelpCatalogue(message, {
				commands,
				inhibitors
			}),
			helpReply =	this.createHelpEmbed(message, catalogue);

		return message.send({
			files: helpReply.messageAttachments,
			embed: helpReply.messageEmbed
		});
	}

	createCommandHelpEmbed(message, command) {
		const model = new CommandHelpModel(command, message),
			commandHelpEmbed = new CommandHelpView(model);

		return commandHelpEmbed;
	}

	createHelpEmbed(message, catalogue) {
		const model = new HelpModel(catalogue, message),
			helpEmbed = new HelpView(model);

		return helpEmbed;
	}

	async buildHelpCatalogue(message, clientData) {
		const {
				commands,
				inhibitors
			} = clientData,
			helpCatalogue = {};

		helpCatalogue.__appendix = [];

		await Promise.all(
			commands.map(
				// eslint-disable-next-line arrow-body-style
				(command) => {
					return inhibitors.run(message, command, true)
						.then(() => {
							const {
									category,
									subCategory
								} = command,
								commandHelp = new CommandHelpModel(command, message);

							if (!has(helpCatalogue, category)) {
								helpCatalogue[category] = {};
							}
							if (!has(helpCatalogue[category], subCategory)) {
								helpCatalogue[category][subCategory] = [];
							}

							// eslint-disable-next-line one-var
							const categoryCommands = helpCatalogue[category][subCategory];

							helpCatalogue.__appendix.push(command);
							categoryCommands.push(commandHelp);

							return command;
						})
						.catch(() => {
							// noop
						});
				}
			)
		);

		return helpCatalogue;
	}
};
