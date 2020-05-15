/*
	Klasa core command piece (v0.5.0-dev)
 	General > Chat Bot Info > info.js
*/

const { Command } = require('klasa');
const InfoView = require('../../lib/view/info');
const CoreModel = require('../../lib/model/core/model');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: 'info',
			runIn: ['text', 'dm'],
			aliases: ['details', 'what'],
			guarded: true,
			description: language => language.get('COMMAND_INFO_DESCRIPTION')
		});
	}

	createBotInfoEmbed(message) {
		const model = new CoreModel(message),
			botInfoEmbed = new InfoView(model);

		return botInfoEmbed;
	}

	async run(message) {
		const botInfoReply = this.createBotInfoEmbed(message);

		return message.send({
			files: botInfoReply.messageAttachments,
			embed: botInfoReply.messageEmbed
		});
	}
};
