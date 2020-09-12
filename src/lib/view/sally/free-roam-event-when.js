/* eslint max-classes-per-file: ["error", 2] */

import {
	Collection,
	MessageAttachment
} from 'discord.js';
import CoreView from '../core/view';
import * as MessageUtil from '../../util/message';
import * as DateTimeUtil from '../../util/date-time';
import DATE from '../../settings/formats';
import { CATEGORY_NAMES } from '../../settings/sally/free-roam-events';
import { data } from '../../../../data/persona.json';
import { cleanSearchParams as lowerCaseMash } from '../../util/argument';

const { sally } = data;

class FreeRoamEventWhenViewHelper extends CoreView {
	getFreeRoamEventField(occurrences, inline = false) {
		const gcl = this.getCommandLiteral,
			formattedEventDetails = this.formatFreeRoamEventDetails(occurrences);

		return [
			gcl('LABEL.EVENT'),
			formattedEventDetails,
			inline
		];
	}

	getOtherOccurrencesField(others, inline = false) {
		const gcl = this.getCommandLiteral,
			formattedOtherOccurrences = this.formatOtherOccurrences(others);

		return [
			gcl('LABEL.OTHER_TIMES'),
			formattedOtherOccurrences,
			inline
		];
	}

	getTitleText() {
		return this.getCommandLiteral('MESSAGE.SALLY_WHEN_TITLE');
	}

	getDescriptionText() {
		return this.getCommandLiteral('MESSAGE.SALLY_WHEN_DESC');
	}

	getThumbnail() {
		return {
			url: MessageUtil.makeAttachmentString(sally.iconFile)
		};
	}

	formatFreeRoamEventDetails(occurrences) {
		return (occurrences.eventInfo.role)
			? this.getCommandLiteral('MESSAGE.SALLY_NEXT_ROLE_EVENT_DETAIL')(
				occurrences.nearest,
				occurrences.eventInfo.name,
				occurrences.eventInfo.role,
				occurrences.nearestDiff
			)
			: this.getCommandLiteral('MESSAGE.SALLY_NEXT_GENERAL_EVENT_DETAIL')(
				occurrences.nearest,
				occurrences.eventInfo.name,
				occurrences.nearest
			);
	}

	formatOtherOccurrences(occurences) {
		return occurences.map((eventTime) => `\`${eventTime} GMT\``).join('\n');
	}
}

class FreeRoamEventWhenView extends FreeRoamEventWhenViewHelper {
	makeFreeRoamEventWhenEmbed(queryParams) {
		const freeRoamEventName = queryParams.searchQuery,
			cleanFreeRoamEventName = lowerCaseMash(freeRoamEventName),
			freeRoamEventCollection = this.findFreeRoamEventCollection(cleanFreeRoamEventName),
			FreeRoamEventWhenEmbed = this.embed;

		// If there is a match, add the event details to the embed
		if (freeRoamEventCollection.size !== 0) {
			const freeRoamEventOccurrences = this.getOccurrences(freeRoamEventCollection),
				eventInfoField = this.getFreeRoamEventField(freeRoamEventOccurrences),
				{ others: otherOccurrences } = freeRoamEventOccurrences;

			FreeRoamEventWhenEmbed.addField(...eventInfoField)

			// If there are other occureneces, add a field displaying them
			if(typeof otherOccurrences !== 'undefined' && otherOccurrences.length !== 0) {
				const otherOccurrencesField = this.getOtherOccurrencesField(freeRoamEventOccurrences.others);
				FreeRoamEventWhenEmbed.addField(...otherOccurrencesField);
			}
		} else {
			// Handle no match for search
			const gcl = this.getCommandLiteral;

			FreeRoamEventWhenEmbed
				.setTitle(gcl('MESSAGE.EMPTY_TITLE'))
				.setDescription(gcl('MESSAGE.ERROR_SALLY_WHEN'));
		}

		return FreeRoamEventWhenEmbed;
	}

	get messageEmbed() {
		const self = this,
			{ meta: queryParams } = self.model;

		return self.makeFreeRoamEventWhenEmbed(queryParams);
	}

	get messageAttachments() {
		const { imageAttachments } = this,
			sallyThumbnailAttachment = new MessageAttachment(`./${sally.iconFolder}${sally.iconFile}`);

		imageAttachments.push(sallyThumbnailAttachment);

		return imageAttachments;
	}

	// Helpers
	findFreeRoamEventCollection(freeRoamEventName) {
		const self = this,
			{
				inEventCollection,
				filterEventCollection
			} = self,
			{ eventSchedule } = self.model,
			generalEventsCollection = eventSchedule.get(CATEGORY_NAMES.GENERAL),
			roleEventsCollection = eventSchedule.get(CATEGORY_NAMES.ROLE);

		let freeRoamEventCollection;

		if (inEventCollection(freeRoamEventName, generalEventsCollection)) {
			freeRoamEventCollection = filterEventCollection(
				freeRoamEventName,
				generalEventsCollection
			);
		} else if (inEventCollection(freeRoamEventName, roleEventsCollection)) {
			freeRoamEventCollection = filterEventCollection(
				freeRoamEventName,
				roleEventsCollection
			);
		} else freeRoamEventCollection = new Collection();

		return freeRoamEventCollection;
	}

	inEventCollection(name, collection) {
		return !!collection.find((eventInfo) => lowerCaseMash(eventInfo.name) === name);
	}

	filterEventCollection(name, collection) {
		return collection.filter((eventInfo) => lowerCaseMash(eventInfo.name) === name);
	}

	getOccurrences(freeRoamEventCollection) {
		const now = DateTimeUtil.nowUTC(),
			nextFreeRoamEventTime = this.getNextFreeRoamEvent(freeRoamEventCollection, now),
			nextFreeRoamEvent = freeRoamEventCollection.get(nextFreeRoamEventTime),
			humanizedDiff = this.humanizeEventTimeDiff(now, nextFreeRoamEventTime),
			otherOccurrences = freeRoamEventCollection
				.filter((eventInfo, eventTime) => eventTime !== nextFreeRoamEventTime),
			others = Array.from(otherOccurrences.keys());

		return {
			eventInfo: nextFreeRoamEvent,
			nearest: nextFreeRoamEventTime,
			nearestDiff: humanizedDiff,
			others
		};
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
}

export default FreeRoamEventWhenView;
