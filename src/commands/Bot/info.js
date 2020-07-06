/*
	Klasa core command piece (v0.5.0-dev)
 	General > Chat Bot Info > info.js
*/

import { Command } from 'klasa';
import CoreModel from '../../lib/model/core/model';
import InfoView from '../../lib/view/info';

export default class extends Command {
	constructor(...args) {
		super(...args, {
			name: 'info',
			runIn: ['text', 'dm'],
			aliases: ['details', 'what'],
			guarded: true,
			requiredPermissions: [
				'SEND_MESSAGES',
				'ATTACH_FILES'
			],
			description: (language) => language.get('COMMAND_INFO_DESCRIPTION')
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
}
