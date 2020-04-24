const { Command } = require('klasa');
const fetch = require('node-fetch');
const { lowerCase } = require('voca');

const MADAM_NAZAR_API = require('../../lib/settings/url');
const NazarLocationModel = require('../../lib/model/nazar/location');
const WeeklySetsModel = require('../../lib/model/nazar/weekly-sets');
const LoadingModel = require('../../lib/model/loading');
const NazarLocationView = require('../../lib/view/nazar/location');
const WeeklySetsView = require('../../lib/view/nazar/weekly-sets');
const LoadingView = require('../../lib/view/loading');
const { getCommandLiteral } = require('../../lib/util/message');

const EMPTY_STRING = '';
const DELIMITER_SPACE = ' ';

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

		message.edit({
			files: [nazarLocationReply.imageAttachment],
			embed: nazarLocationReply.messageEmbed
		});
	}

	run(message) {
		const cantUnderstandMessage = getCommandLiteral('MESSAGE.ERROR_GENERAL_REPLY', message);

		message.channel.send(cantUnderstandMessage);
	}

	/* Tells you the location of Madam Nazar */
	async wya(message) {
		const self = this,
			getLocale = (key) => getCommandLiteral(key, message),
			loadingView = new LoadingView(new LoadingModel(message)),
			loadingEmbed = loadingView.messageEmbed
				.setTitle(getLocale('MESSAGE.NAZAR_WYA_LOADING_TITLE'))
				.setDescription(getLocale('MESSAGE.NAZAR_WYA_LOADING_DESC'));

		message.channel
			.send(loadingEmbed)
			.then((msg) => self.fetchNazarLocation(msg));
	}

	/* Gives you details on Madam Nazar's Weekly Sets */
	weekly(message, params) {
		const self = this,
			reply = (option, activeMessage) => {
				(option === 'all') ? self.sendAllSets(activeMessage) : self.sendSet(activeMessage, option);
			};

		if (params.length === 0) {
			self.sendSet(message);
		} else {
			const cleanParams = lowerCase(
				params[0]
					.trim()
					.split(DELIMITER_SPACE)
					.join(EMPTY_STRING)
			);

			reply(cleanParams, message);
		}
	}

	fetchNazarLocation(message) {
		fetch(MADAM_NAZAR_API.currentLocationAPI())
			.then((response) => response.json())
			.then((responseJson) => this.wyaReply(message, responseJson))
			.catch((err) => console.error(err));
	}

	/* Displays all of Madam Nazar's Weekly Sets */
	sendAllSets(message, setName = 'all') {
		const weeklySetsEmbed = this.createWeeklySetEmbed(message, setName);

		message.channel.send({
			files: [weeklySetsEmbed.imageAttachment],
			embed: weeklySetsEmbed.messageEmbed
		});
	}

	/* Displays a Madam Nazar Weekly Set, current or specified */
	sendSet(message, setName = 'current') {
		const weeklySetsEmbed = this.createWeeklySetEmbed(message, setName);

		message.channel.send({
			files: [weeklySetsEmbed.imageAttachment],
			embed: weeklySetsEmbed.messageEmbed
		});
	}
};
