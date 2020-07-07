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
		return this.getCommandLiteral('MESSAGE.SALLY_EVENTS_TITLE');
	}

	getDescriptionText() {
		let descriptionText = this.getCommandLiteral('MESSAGE.SALLY_EVENTS_DESC');

		// Add the Random event note for complete and general schedules
		if (!this.isRoleSchedule()) {
			const randomEventNote = this.getCommandLiteral('MESSAGE.SALLY_RANDOM_EVENT_NOTE');

			descriptionText += `\n\n${randomEventNote}`;
		}

		return descriptionText;
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
	constructor(model) {
		super(model);

		this.SCHEDULE_ITEM_POSITION_ENUM = {
			EVENT_TIME: 0,
			EVENT_NAME: 1,
			ROLE_NAME: 2
		}
	}
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
			generalScheduleList = self.model.eventSchedule.general,
			generalEventSchedule = this.createGeneralSchedule(generalScheduleList);

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
			roleScheduleList = self.model.eventSchedule.role,
			roleEventSchedule = this.createRoleSchedule(roleScheduleList, inline);

		ScheduleViewEmbed.addFields({
			name: capitalize(CATEGORY_NAMES.ROLE),
			value: roleEventSchedule,
			inline
		});

		return ScheduleViewEmbed;
	}

	createGeneralSchedule(generalScheduleList) {
		const {
				SCHEDULE_ITEM_POSITION_ENUM,
				formatGeneralScheduleItem
			} = this,
			{
				EVENT_TIME: EVENT_TIME_POSITION,
				EVENT_NAME: EVENT_NAME_POSITION
			} = SCHEDULE_ITEM_POSITION_ENUM;

		return generalScheduleList
			.reduce((scheduleText, freeRoamEvent) => {
				const freeRoamEventTime = freeRoamEvent[EVENT_TIME_POSITION],
					freeRoamEventName = freeRoamEvent[EVENT_NAME_POSITION],
					eventScheduleItem = formatGeneralScheduleItem(freeRoamEventTime, freeRoamEventName);

				return `${scheduleText}${eventScheduleItem}${DELIMITER.NEW_LINE}`;
			}, DELIMITER.NEW_LINE);
	}

	createRoleSchedule(roleScheduleList, inline = true) {
		const 	{
				SCHEDULE_ITEM_POSITION_ENUM,
				formatRoleScheduleItem
			} = this,
			{
				EVENT_TIME: EVENT_TIME_POSITION,
				EVENT_NAME: EVENT_NAME_POSITION,
				ROLE_NAME: ROLE_NAME_POSITION
			} = SCHEDULE_ITEM_POSITION_ENUM;

		return roleScheduleList
			.reduce((scheduleText, freeRoamEvent) => {
				const freeRoamEventTime = freeRoamEvent[EVENT_TIME_POSITION],
					freeRoamEventName = freeRoamEvent[EVENT_NAME_POSITION],
					roleEventName = () => (!inline)
						? freeRoamEvent[ROLE_NAME_POSITION]
						: '',
					eventScheduleItem = formatRoleScheduleItem(
						freeRoamEventTime,
						freeRoamEventName,
						roleEventName()
					);

				return `${scheduleText}${eventScheduleItem}${DELIMITER.NEW_LINE}`;
			}, DELIMITER.NEW_LINE);
	}

	formatGeneralScheduleItem(eventTime, eventName) {
		return `\`${eventTime}\` - ${eventName}`;
	}

	formatRoleScheduleItem(eventTime, eventName, roleName = '') {
		const specifyRole = (role) => (!!role) ? `\`${role}\`` : '';

		return `\`${eventTime}\` - ${specifyRole(roleName)} ${eventName}`;
	}
}

export default FreeRoamEventScheduleView;
