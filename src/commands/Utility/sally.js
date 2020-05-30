import { Command } from 'klasa';

import FreeRoamEventsModel from '../../lib/model/sally/free-roam-events';
import ScheduleView from '../../lib/view/sally/free-roam-event-schedule';
import { cleanParams } from '../../lib/util/argument';
import { getCommandLiteral } from '../../lib/util/message';
import { QUERY_TYPE } from '../../lib/settings/general';

export default class extends Command {
	constructor(...args) {
		super(...args, {
			name: 'sally',
			enabled: true,
			runIn: ['text'],
			subcommands: true,
			description: (language) => language.get('COMMANDS').MESSAGE.SALLY_DESC,
			usage: '[events] [eventQuery:...string]',
			usageDelim: ' '
		});
	}

	run(message) {
		const cantUnderstandMessage = getCommandLiteral('MESSAGE.ERROR_GENERAL_REPLY', message);

		message.channel.send(cantUnderstandMessage);
	}

	/* Gives you event schedule */
	async events(message, params) {
		const self = this,
			nextEventName = null;
		let response;

		if (params.length === 0) {
			response = self.sendEventSchedule(message);
		} else {
			const tidyParams = cleanParams(params[0]),
				// eslint-disable-next-line arrow-body-style
				reply = (option, activeMessage) => {
					return (option === QUERY_TYPE.ALL)
						? self.sendEventSchedule(activeMessage)
						: self.sendSchedule(activeMessage, {
							queryType: QUERY_TYPE.SEARCH,
							nextEventName,
							searchQuery: option
						});
				};

			response = await reply(tidyParams, message);
		}

		return response;
	}

	createScheduleEmbed(options, message) {
		const freeRoamEventsModel = new FreeRoamEventsModel(message, options),
			scheduleView = new ScheduleView(freeRoamEventsModel);

		return scheduleView;
	}

	/* Displays the complete free roam event schedule */
	sendEventSchedule(message, nextEventName) {
		return this.sendSchedule(message, {
			queryType: QUERY_TYPE.ALL,
			nextEventName
		});
	}

	/* Displays a free roam event schedule, in general or for roles */
	sendSchedule(message, options) {
		const scheduleEmbed = this.createScheduleEmbed(options, message);

		return message.channel.send({
			files: scheduleEmbed.messageAttachments,
			embed: scheduleEmbed.messageEmbed
		});
	}
}
