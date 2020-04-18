const { Command } = require('klasa');
const fetch = require('node-fetch');
const MADAM_NAZAR_API = require('../../lib/settings/url');
const {
	Location: NazarLocationModel,
	WeeklySets: WeeklySetsModel
} = require('../../lib/model/nazar');
const NazarLocationView = require('../../lib/view/nazar/location');
const WeeklySetsView = require('../../lib/view/nazar/weekly-sets');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: 'nazar',
			enabled: true,
			runIn: ['text'],
			subcommands: true,
			description: (language) => language.get('COMMANDS').MESSAGE.NAZAR_DESC,
			usage: '[wya|sets] [setName:...string]',
			usageDelim: ' '
		});
	}

	createNazarLocationEmbed(message, nazarLocationJson) {
		const nazarLocationModel = new NazarLocationModel(nazarLocationJson, message),
			nazarLocationView = new NazarLocationView(nazarLocationModel);

		return nazarLocationView;
	}

	createWeeklySetsEmbed(message) {
		const weeklySetsModel = new WeeklySetsModel(message),
			weeklySetsView = new WeeklySetsView(weeklySetsModel);

		return weeklySetsView;
	}

	wyaReply(message, locationJson) {
		const nazarLocationReply = this.createNazarLocationEmbed(message, locationJson);

		message.channel.send({
			files: [nazarLocationReply.imageAttachment],
			embed: nazarLocationReply.messageEmbed
		});
	}

	/* Tells you the location of Madam Nazar */
	async wya(message) {
		fetch(MADAM_NAZAR_API.currentLocationAPI())
			.then((response) => response.json())
			.then((responseJson) => this.wyaReply(message, responseJson))
			.catch((err) => console.error(err));
	}

	/* Displays all of Madam Nazar's Weekly Sets */
	sets(message) {
		const weeklySetsEmbed = this.createWeeklySetsEmbed(message);

		message.channel.send({
			files: [weeklySetsEmbed.imageAttachment],
			embed: weeklySetsEmbed.messageEmbed
		});
	}

	/* Reveal the items for a given set name */
	// set(message, params) {
	// 	const self = this;
	//
	// 	switch (params.length) {
	// 		case 0:
	// 			message.channel.send('Display all sets');
	// 			break;
	// 		case 1:
	// 			message.channel.send(`Display ${params[0]} set`);
	// 			break;
	// 		default:
	// 			message.channel.send("I don't understand");
	// 			break;
	// 	}
	// }
};
