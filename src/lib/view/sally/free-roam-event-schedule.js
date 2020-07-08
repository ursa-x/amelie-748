/* eslint max-classes-per-file: ["error", 2] */

import { MessageAttachment } from 'discord.js';
import { capitalize } from 'voca';
import CoreView from '../core/view';
import * as MessageUtil from '../../util/message';
import {
	DELIMITER,
	QUERY_TYPE
} from '../../settings/general';
import { CATEGORY_NAMES } from '../../settings/sally/free-roam-events';
import { data } from '../../../../data/persona.json';

const { sally } = data;

class ScheduleViewHelper extends CoreView {
	getTitleText() {
		let title = this.getCommandLiteral('MESSAGE.SALLY_EVENTS_TITLE');

		if (this.isGeneralSchedule()) {
			title = this.getCommandLiteral('MESSAGE.SALLY_GENERAL_EVENTS_TITLE');
		}

		if (this.isRoleSchedule()) {
			title = this.getCommandLiteral('MESSAGE.SALLY_ROLE_EVENTS_TITLE');
		}

		return title;
	}

	getDescriptionText() {
		let description = this.getCommandLiteral('MESSAGE.SALLY_EVENTS_DESC');

		// Add the Random event note for complete and general schedules
		if (!this.isRoleSchedule()) {
			const randomEventNote = this.getCommandLiteral('MESSAGE.SALLY_RANDOM_EVENT_NOTE');

			description += `\n\n${randomEventNote}`;
		}

		return description;
	}

	getThumbnail() {
		return {
			url: MessageUtil.makeAttachmentString(sally.iconFile)
		};
	}

	isCompleteSchedule() {
		const scheduleMeta = this.model.meta;

		return scheduleMeta.queryType === QUERY_TYPE.ALL;
	}

	isSpecificSchedule(eventType) {
		const scheduleMeta = this.model.meta;

		return scheduleMeta.queryType === QUERY_TYPE.SEARCH
			&& !!scheduleMeta.searchQuery
			&& scheduleMeta.searchQuery === eventType;
	}

	isGeneralSchedule() {
		return this.isSpecificSchedule(CATEGORY_NAMES.GENERAL);
	}

	isRoleSchedule() {
		return this.isSpecificSchedule(CATEGORY_NAMES.ROLE);
	}
}

class FreeRoamEventScheduleView extends ScheduleViewHelper {
	get messageEmbed() {
		const self = this,
			{ meta: queryParams } = self.model,
			{ queryType } = queryParams;

		switch (queryType) {
		case QUERY_TYPE.ALL:
			return self.makeScheduleEmbed();
		case QUERY_TYPE.SEARCH:
			return self.makeScheduleEmbed(queryParams.searchQuery);
		default:
			return self.makeScheduleEmbed();
		}
	}

	get messageAttachments() {
		const { imageAttachments } = this,
			sallyThumbnailAttachment = new MessageAttachment(`./${sally.iconFolder}${sally.iconFile}`);

		imageAttachments.push(sallyThumbnailAttachment);

		return imageAttachments;
	}

	makeScheduleEmbed(eventType = QUERY_TYPE.ALL) {
		const self = this,
			noInline = false,
			makeCompleteScheduleEmbed = () => {
				self.embed = this.makeGeneralScheduleEmbed();
				self.embed = this.makeRoleScheduleEmbed();

				return self.embed;
			};

		switch (eventType) {
		case CATEGORY_NAMES.GENERAL:
			return this.makeGeneralScheduleEmbed(noInline);
		case CATEGORY_NAMES.ROLE:
			return this.makeRoleScheduleEmbed(noInline);
		default:
			return makeCompleteScheduleEmbed();
		}
	}

	makeGeneralScheduleEmbed(inline = true) {
		// TODO: Highlight 'next' when displaying all
		const self = this,
			ScheduleViewEmbed = this.embed,
			generalScheduleCollection = self.model.eventSchedule.get(CATEGORY_NAMES.GENERAL),
			generalEventSchedule = this.createGeneralSchedule(generalScheduleCollection);

		ScheduleViewEmbed.addFields({
			name: capitalize(CATEGORY_NAMES.GENERAL),
			value: generalEventSchedule,
			inline
		});

		return ScheduleViewEmbed;
	}

	makeRoleScheduleEmbed(inline = true) {
		// TODO: Highlight 'next' when displaying all
		const self = this,
			ScheduleViewEmbed = this.embed,
			roleScheduleCollection = self.model.eventSchedule.get(CATEGORY_NAMES.ROLE),
			roleEventSchedule = this.createRoleSchedule(roleScheduleCollection, inline);

		ScheduleViewEmbed.addFields({
			name: capitalize(CATEGORY_NAMES.ROLE),
			value: roleEventSchedule,
			inline
		});

		return ScheduleViewEmbed;
	}

	createGeneralSchedule(generalScheduleCollection) {
		const {	formatGeneralScheduleItem } = this;

		return generalScheduleCollection
			.reduce((scheduleText, freeRoamEvent, eventTime) => {
				const eventScheduleItem = formatGeneralScheduleItem(
					eventTime,
					freeRoamEvent.name
				);

				return `${scheduleText}${eventScheduleItem}\n`;
			}, DELIMITER.NEW_LINE);
	}

	createRoleSchedule(roleScheduleCollection, inline = true) {
		const 	{ formatRoleScheduleItem } = this;

		return roleScheduleCollection
			.reduce((scheduleText, freeRoamEvent, eventTime) => {
				const freeRoamEventName = freeRoamEvent.name,
					roleEventName = (!inline) ? freeRoamEvent.role : '',
					eventScheduleItem = formatRoleScheduleItem(
						eventTime,
						freeRoamEventName,
						roleEventName()
					);

				return `${scheduleText}${eventScheduleItem}\n`;
			}, DELIMITER.NEW_LINE);
	}

	formatGeneralScheduleItem(eventTime, eventName) {
		return `\`${eventTime}\` - ${eventName}`;
	}

	formatRoleScheduleItem(eventTime, eventName, roleName = '') {
		// eslint-disable-next-line no-confusing-arrow
		const specifyRole = (role) => (role) ? `\`${role}\`` : '';

		return `\`${eventTime}\` - ${eventName} ${specifyRole(roleName)}`;
	}
}

export default FreeRoamEventScheduleView;
