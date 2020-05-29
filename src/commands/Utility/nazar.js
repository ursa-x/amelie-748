import { Command } from 'klasa';

import NazarLocationModel from '../../lib/model/nazar/location';
import WeeklySetsModel from '../../lib/model/nazar/weekly-sets';
import LoadingModel from '../../lib/model/loading';
import NazarLocationView from '../../lib/view/nazar/location';
import WeeklySetsView from '../../lib/view/nazar/weekly-sets';
import LoadingView from '../../lib/view/core/loading';
import { cleanParams } from '../../lib/util/argument';
import { getCommandLiteral } from '../../lib/util/message';
import { QUERY_TYPE } from '../../lib/settings/general';

export default class extends Command {
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
			files: nazarLocationReply.messageAttachments,
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
				files: loadingView.messageAttachments,
				embed: loadingEmbed
			})
			.then(async (msg) => {
				self.wyaReply(
					msg,
					await self.getNazarsLocation()
				);
			});
	}

	/* Gives you details on Madam Nazar's Weekly Sets */
	async weekly(message, params) {
		const self = this,
			currentSetName = await self.getCurrentWeeklySet();
		let response;

		if (params.length === 0) {
			response = await self.sendCurrentSet(message, currentSetName);
		} else {
			const tidyParams = cleanParams(params[0]),
				// eslint-disable-next-line arrow-body-style
				reply = (option, activeMessage) => {
					return (option === QUERY_TYPE.ALL)
						? self.sendAllSets(activeMessage)
						: self.sendSet(activeMessage, {
							queryType: QUERY_TYPE.SEARCH,
							currentSetName,
							searchSetName: option
						});
				};

			response = await reply(tidyParams, message);
		}

		return response;
	}

	async getNazarsLocation() {
		const NazarService = this.client.services.get('nazar');

		return NazarService.todayLocation;
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
			files: weeklySetsEmbed.messageAttachments,
			embed: weeklySetsEmbed.messageEmbed
		});
	}

	async getCurrentWeeklySet() {
		// eslint-disable-next-line max-len
		const NazarService = this.client.services.get('nazar');

		return NazarService.weeklySet;
	}
}
