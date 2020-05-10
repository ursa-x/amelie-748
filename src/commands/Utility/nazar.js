const { Command } = require('klasa');
const fetch = require('node-fetch');

const NazarLocationModel = require('../../lib/model/nazar/location');
const WeeklySetsModel = require('../../lib/model/nazar/weekly-sets');
const LoadingModel = require('../../lib/model/loading');
const NazarLocationView = require('../../lib/view/nazar/location');
const WeeklySetsView = require('../../lib/view/nazar/weekly-sets');
const LoadingView = require('../../lib/view/core/loading');
const { getCommandLiteral } = require('../../lib/util/message');
const { cleanParams } = require('../../lib/util/argument');
const { QUERY_TYPE } = require('../../lib/settings/general');
const {
	MADAM_NAZAR_API,
	COLLECTOR_MAP_API
} = require('../../lib/settings/url');

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

	createWeeklySetEmbed(options, message) {
		const weeklySetsModel = new WeeklySetsModel(message, options),
			weeklySetsView = new WeeklySetsView(weeklySetsModel);

		return weeklySetsView;
	}

	wyaReply(message, locationJson) {
		const nazarLocationReply = this.createNazarLocationEmbed(message, locationJson);

		return message.edit({
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

		return message.channel
			.send({
				files: [loadingView.imageAttachment],
				embed: loadingEmbed
			})
			.then((msg) => self.fetchNazarLocation(msg));
	}

	/* Gives you details on Madam Nazar's Weekly Sets */
	async weekly(message, params) {
		const self = this,
			currentSetName = await self.fetchCurrentWeeklySet();

		if (params.length === 0) {
			self.sendCurrentSet(message, currentSetName);
		} else {
			const tidyParams = cleanParams(params[0]),
				reply = (option, activeMessage) => {
					(option === QUERY_TYPE.ALL)
						? self.sendAllSets(activeMessage)
						: self.sendSet(activeMessage, {
							queryType: QUERY_TYPE.SEARCH,
							currentSetName,
							searchSetName: option
						});
				};


			reply(tidyParams, message);
		}
	}

	fetchNazarLocation(message) {
		fetch(MADAM_NAZAR_API.currentLocationAPI())
			.then((response) => response.json())
			.then((responseJson) => this.wyaReply(message, responseJson))
			.catch((err) => console.error(err));
	}

	/* Displays all of Madam Nazar's Weekly Sets */
	sendAllSets(message, currentSetName) {
		return this.sendSet(message, {
			queryType: QUERY_TYPE.ALL,
			currentSetName
		});
	}

	sendCurrentSet(message, currentSetName) {
		return this.sendSet(message, {
			queryType: QUERY_TYPE.DEFAULT,
			currentSetName
		});
	}

	/* Displays a Madam Nazar Weekly Set, current or specified */
	sendSet(message, options) {
		const weeklySetsEmbed = this.createWeeklySetEmbed(options, message);

		return message.channel.send({
			files: [weeklySetsEmbed.imageAttachment],
			embed: weeklySetsEmbed.messageEmbed
		});
	}

	fetchCurrentWeeklySet() {
		return fetch(COLLECTOR_MAP_API.getCurrentWeeklySetAPI())
			.then((response) => response.json())
			.then((responseJson) => responseJson.current)
			.catch((err) => {
				console.error(err);
				return null;
			});
	}
};
