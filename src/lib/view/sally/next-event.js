/* eslint max-classes-per-file: ["error", 2] */

import { MessageAttachment } from 'discord.js';
import CoreView from '../core/view';
import * as MessageUtil from '../../util/message';
import * as DateTimeUtil from '../../util/date-time';
import DATE from '../../settings/formats';
import { CATEGORY_NAMES } from '../../settings/sally/free-roam-events';
import { data } from '../../../../data/persona.json';

const { sally } = data;

class NextEventViewHelper extends CoreView {
	getGeneralEventField(inline = false) {
		const gcl = this.getCommandLiteral,
			generalEvent = this.getNextEvent(CATEGORY_NAMES.GENERAL),
			formattedEventDetails = this.getFormattedEventDetails(generalEvent);

		return [
			gcl('LABEL.GENERAL'),
			formattedEventDetails,
			inline
		];
	}

	getRoleEventField(inline = false) {
		const gcl = this.getCommandLiteral,
			roleEvent = this.getNextEvent(CATEGORY_NAMES.ROLE),
			formattedEventDetails = this.getFormattedEventDetails(roleEvent);

		return [
			gcl('LABEL.ROLE'),
			formattedEventDetails,
			inline
		];
	}

	getTitleText() {
		return this.getCommandLiteral('MESSAGE.SALLY_NEXT_EVENTS_TITLE');
	}

	getDescriptionText() {
		return this.getCommandLiteral('MESSAGE.SALLY_NEXT_EVENTS_DESC');
	}

	getThumbnail() {
		return {
			url: MessageUtil.makeAttachmentString(sally.iconFile)
		};
	}

	getFormattedEventDetails(event) {
		return `**${event.name}**`
			+ `\nStarts ${event.diff}`
			+ `\n\`${event.time} GMT\``;
	}

	humanizeEventTimeDiff(nowInUTC, untidyLater) {
		const laterInUTC = DateTimeUtil.dateTimeUTC(
			untidyLater,
			DATE.SALLY.EVENT_TIME
		);

		return DateTimeUtil.humanizedDiff(nowInUTC, laterInUTC);
	}

	// Sift through the schedule to find closest event to now
	getNextEventAsRow(eventSchedule, now) {
		return eventSchedule.find(
			(event) => now.isSameOrBefore(
				DateTimeUtil.dateTimeUTC(
					event[0],
					DATE.SALLY.EVENT_TIME
				)
			)
		);
	}

	getNextEvent(categoryName) {
		const eventSchedule = this.model.eventSchedule[categoryName],
			now = DateTimeUtil.nowUTC(),
			flattenedNextEvent = this.getNextEventAsRow(eventSchedule, now),
			humanizedDiff = this.humanizeEventTimeDiff(now, flattenedNextEvent[0]);

		return {
			time: flattenedNextEvent[0],
			name: flattenedNextEvent[1],
			diff: humanizedDiff
		};
	}
}

class NextEventView extends NextEventViewHelper {
	makeNextEventEmbed() {
		const nextGeneralEventField = this.getGeneralEventField(),
			nextRoleEventField = this.getRoleEventField(),
			NextEventEmbed = this.embed
				.addField(...nextGeneralEventField)
				.addField(...nextRoleEventField);

		return NextEventEmbed;
	}

	get messageEmbed() {
		return this.makeNextEventEmbed();
	}

	get messageAttachments() {
		const { imageAttachments } = this,
			sallyThumbnailAttachment = new MessageAttachment(`./${sally.iconFolder}${sally.iconFile}`);

		imageAttachments.push(sallyThumbnailAttachment);

		return imageAttachments;
	}
}

export default NextEventView;
