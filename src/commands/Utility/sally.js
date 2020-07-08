import { Command } from 'klasa';

import FreeRoamEventsModel from '../../lib/model/sally/free-roam-events';
import NextEventView from '../../lib/view/sally/next-event';
import ScheduleView from '../../lib/view/sally/free-roam-event-schedule';
import FreeRoamEventWhenView from '../../lib/view/sally/free-roam-event-when';
import { cleanSearchParams } from '../../lib/util/argument';
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
			usage: '[next|events|when] [eventQuery:...string]',
			usageDelim: ' '
		});
	}

	async run(message) {
		return await this.next(message);
	}

	// Sends the general and role events that are next in line
	async next(message) {
		const nextEventEmbed = this.createNextEventEmbed(message);

		return await message.channel.send({
			files: nextEventEmbed.messageAttachments,
			embed: nextEventEmbed.messageEmbed
		});
	}

	// Gives you the free roam event schedule
	async events(message, params) {
		const self = this,
			nextEventName = null;
		let response;

		if (params.length === 0) {
			response = self.sendEventSchedule(message);
		} else {
			const tidyParams = cleanSearchParams(params[0]),
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

	// Gives you the details of an event
	async when(message, params) {
		const self = this;
		let response;

		if (params.length === 0) {
			// When no event is specified, display the next event?
			response = self.next(message);
		} else {
			// When a option is passed, look up for the event
			const tidyParams = cleanSearchParams(params[0]),
				// eslint-disable-next-line arrow-body-style
				reply = (option, activeMessage) => {
					return (option === QUERY_TYPE.ALL)
						? self.sendEventSchedule(activeMessage)
						: self.sendEventDetails(activeMessage, {
							queryType: QUERY_TYPE.SEARCH,
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

	createEventDetailsEmbed(options, message) {
		const freeRoamEventsModel = new FreeRoamEventsModel(message, options),
			eventDetailsView = new FreeRoamEventWhenView(freeRoamEventsModel);

		return eventDetailsView;
	}

	// Displays the complete free roam event schedule
	sendEventSchedule(message, nextEventName) {
		return this.sendSchedule(message, {
			queryType: QUERY_TYPE.ALL,
			nextEventName
		});
	}

	// Displays a free roam event schedule, the general or one for roles
	sendSchedule(message, options) {
		const scheduleEmbed = this.createScheduleEmbed(options, message);

		return message.channel.send({
			files: scheduleEmbed.messageAttachments,
			embed: scheduleEmbed.messageEmbed
		});
	}

	// Displays the details of an event
	sendEventDetails(message, options) {
		const eventDetailsEmbed = this.createEventDetailsEmbed(options, message);

		return message.channel.send({
			files: eventDetailsEmbed.messageAttachments,
			embed: eventDetailsEmbed.messageEmbed
		});
	}
}
