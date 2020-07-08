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
			generalEvent = this.getNextFreeRoamEventAsObj(CATEGORY_NAMES.GENERAL),
			formattedEventDetails = this.formatFreeRoamEventDetails(generalEvent);

		return [
			gcl('LABEL.GENERAL'),
			formattedEventDetails,
			inline
		];
	}

	getRoleEventField(inline = false) {
		const gcl = this.getCommandLiteral,
			roleEvent = this.getNextFreeRoamEventAsObj(CATEGORY_NAMES.ROLE),
			formattedEventDetails = this.formatFreeRoamEventDetails(roleEvent);

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

	formatFreeRoamEventDetails(event) {
		return (event.info.role)
			? this.getCommandLiteral('MESSAGE.SALLY_NEXT_ROLE_EVENT_DETAIL')(
				event.time,
				event.info.name,
				event.info.role,
				event.diff
			)
			: this.getCommandLiteral('MESSAGE.SALLY_NEXT_GENERAL_EVENT_DETAIL')(
				event.time,
				event.info.name,
				event.diff
			);
	}

	humanizeEventTimeDiff(nowInUTC, untidyLater) {
		const laterInUTC = DateTimeUtil.dateTimeUTC(
			untidyLater,
			DATE.SALLY.EVENT_TIME
		);

		return DateTimeUtil.humanizedDiff(nowInUTC, laterInUTC);
	}

	// Sift through the schedule to find closest event to now
	getNextFreeRoamEvent(eventSchedule, now) {
		return eventSchedule.findKey(
			(freeRoamEvent, eventTime) => now.isSameOrBefore(
				DateTimeUtil.dateTimeUTC(
					eventTime,
					DATE.SALLY.EVENT_TIME
				)
			)
		);
	}

	getNextFreeRoamEventAsObj(categoryName) {
		const categoryEventSchedule = this.model.eventSchedule.get(categoryName),
			now = DateTimeUtil.nowUTC(),
			nextFreeRoamEventTime = this.getNextFreeRoamEvent(categoryEventSchedule, now),
			nextFreeRoamEvent = categoryEventSchedule.get(nextFreeRoamEventTime),
			humanizedDiff = this.humanizeEventTimeDiff(now, nextFreeRoamEventTime);

		return {
			time: nextFreeRoamEventTime,
			info: nextFreeRoamEvent,
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
