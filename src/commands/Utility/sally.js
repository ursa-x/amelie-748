import { Command } from 'klasa';

import FreeRoamEventsModel from '../../lib/model/sally/free-roam-events';
import ScheduleView from '../../lib/view/sally/free-roam-event-schedule';
import NextEventView from '../../lib/view/sally/next-event';
import { cleanParams } from '../../lib/util/argument';
import { QUERY_TYPE } from '../../lib/settings/general';

export default class extends Command {
	constructor(...args) {
		super(...args, {
			name: 'sally',
			enabled: true,
			runIn: ['text'],
			requiredPermissions: [
				'SEND_MESSAGES',
				'ATTACH_FILES'
			],
			subcommands: true,
			description: (language) => language.get('COMMANDS').MESSAGE.SALLY_DESC,
			usage: '[events|next] [eventQuery:...string]',
			usageDelim: ' '
		});
	}

	run(message) {
		return this.next(message);
	}

	/* Sends the general and role events that are closest to now */
	next(message) {
		const nextEventEmbed = this.createNextEventEmbed(message);

		return message.channel.send({
			files: nextEventEmbed.messageAttachments,
			embed: nextEventEmbed.messageEmbed
		});
	}

	/* Gives you the free roam event schedule */
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

	createNextEventEmbed(message) {
		const freeRoamEventsModel = new FreeRoamEventsModel(message),
			nextEventView = new NextEventView(freeRoamEventsModel);

		return nextEventView;
	}

	/* Displays the complete free roam event schedule */
	sendEventSchedule(message, nextEventName) {
		return this.sendSchedule(message, {
			queryType: QUERY_TYPE.ALL,
			nextEventName
		});
	}

	/* Displays a free roam event schedule, the general or one for roles */
	sendSchedule(message, options) {
		const scheduleEmbed = this.createScheduleEmbed(options, message);

		return message.channel.send({
			files: scheduleEmbed.messageAttachments,
			embed: scheduleEmbed.messageEmbed
		});
	}
}
