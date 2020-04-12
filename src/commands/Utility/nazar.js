const {Command} = require('klasa');
const fetch = require('node-fetch');
const MADAM_NAZAR_API = require('../../lib/settings/api');
const NazarLocationModel = require('../../lib/model/nazar');
const NazarLocationView = require('../../lib/view/nazar');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: 'nazar',
			enabled: true,
			runIn: ['text'],
			subcommands: true,
			description: 'Find useful Collector role info.',
			usage: '<wya>'
		});
	}

	createNazarLocationEmbed(message, nazarLocationJson) {
		const nazarLocationModel = new NazarLocationModel(nazarLocationJson),
			nazarLocationView = new NazarLocationView(message, nazarLocationModel);

		return nazarLocationView;
	}

	reply(message, locationJson) {
		const nazarLocationReply = this.createNazarLocationEmbed(message, locationJson);

		message.channel.send({
			files: [nazarLocationReply.imageAttachment],
			embed: nazarLocationReply.messageEmbed
		});
	}

	async wya(message, params) {
		fetch(MADAM_NAZAR_API.getCurrentLocation())
			.then(response => response.json())
			.then(responseJson => this.reply(message, responseJson))
			.catch(err => console.error(err));
	}
};
