/*
	Klasa core command piece (v0.5.0-dev)
 	General > Chat Bot Info > ping.js
*/
const { Command } = require('klasa');
const { getKlasaLiteral } = require('../../lib/util/message');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'ping',
			guarded: true,
			description: language => language.get('COMMAND_PING_DESCRIPTION')
		});
	}

	async run(message) {
		const heartbeat = () => Math.round(this.client.ws.ping),
			messageTimeOf = (message) => message.editedTimestamp || message.createdTimestamp,
			pongMessage = (diff, ping) => getKlasaLiteral('COMMAND_PINGPONG', [diff, ping], message),
			pingMessage = await message.send(
				getKlasaLiteral('COMMAND_PING', null, message)
			),
			pingMessageTime = messageTimeOf(pingMessage);

		return message.send(
			pongMessage(
			pingMessageTime - messageTimeOf(message),
				heartbeat()
			)
		);
	}

};
