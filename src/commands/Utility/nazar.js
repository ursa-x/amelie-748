const {Command} = require('klasa');
const fetch = require('node-fetch');
const { lowerCase } = require('voca');
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
			usage: '[wya|weekly] [setName:...string]',
			usageDelim: ' '
		});
	}

	createNazarLocationEmbed(message, nazarLocationJson) {
		const nazarLocationModel = new NazarLocationModel(nazarLocationJson, message),
			nazarLocationView = new NazarLocationView(nazarLocationModel);

		return nazarLocationView;
	}

	createWeeklySetEmbed(message, setName) {
		const weeklySetsModel = new WeeklySetsModel(message),
			weeklySetsView = new WeeklySetsView(weeklySetsModel, setName);

		return weeklySetsView;
	}

	wyaReply(message, locationJson) {
		const nazarLocationReply = this.createNazarLocationEmbed(message, locationJson);

		message.channel.send({
			files: [nazarLocationReply.imageAttachment],
			embed: nazarLocationReply.messageEmbed
		});
	}

	run(message, params) {
		message.channel.send('Sorry I don\'t understand');
	}

	/* Tells you the location of Madam Nazar */
	async wya(message) {
		fetch(MADAM_NAZAR_API.currentLocationAPI())
			.then((response) => response.json())
			.then((responseJson) => this.wyaReply(message, responseJson))
			.catch((err) => console.error(err));
	}

	weekly(message, params) {
		const self = this;

		if (params.length === 0) {
			this.sendSet(message)
		} else {
			const cleanParams = lowerCase(params[0].trim().split(' ').join(''));

			(cleanParams === 'all') ? this.sendAllSets(message) : this.sendSet(message, cleanParams);
		}
	}

	/* Displays all of Madam Nazar's Weekly Sets */
	sendAllSets(message, setName = 'all') {
		const weeklySetsEmbed = this.createWeeklySetEmbed(message, setName);

		message.channel.send({
			files: [weeklySetsEmbed.imageAttachment],
			embed: weeklySetsEmbed.messageEmbed
		});
	}

	sendSet(message, setName = 'current') {
		const weeklySetsEmbed = this.createWeeklySetEmbed(message, setName);

		message.channel.send({
			files: [weeklySetsEmbed.imageAttachment],
			embed: weeklySetsEmbed.messageEmbed
		});
	}
};
