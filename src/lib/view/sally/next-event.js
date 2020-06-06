/* eslint max-classes-per-file: ["error", 2] */

import { MessageAttachment } from 'discord.js';
import { capitalize } from 'voca';
import moment from 'moment';
import CoreView from '../core/view';
import * as MessageUtil from '../../util/message';
import { DELIMITER } from '../../settings/general';
import DATE from '../../settings/formats';
import { CATEGORY_NAMES } from '../../settings/sally/free-roam-events';
import { data } from '../../../../data/persona.json';

const { sally } = data;

class NextEventViewHelper extends CoreView {
	getNextGeneralEvent(inline = false) {
		const self = this,
			gcl = self.getCommandLiteral,
			now = moment.utc(),
			generalEvent = self.model.eventSchedule.general
				.find((event) => now.isSameOrBefore(moment(event[0], DATE.SALLY.EVENT_TIME).utc()));

		return [
			gcl('LABEL.GENERAL'),
			`\`${generalEvent[0]}\` - ${generalEvent[1]}`,
			inline
		]
	}

	getNextRoleEvent(inline = false) {
		const self = this,
			gcl = self.getCommandLiteral,
			now = moment.utc(),
			roleEvent = self.model.eventSchedule.role
				.find((event) => now.isSameOrBefore(moment(event[0], DATE.SALLY.EVENT_TIME).utc()));

		return [
			gcl('LABEL.ROLE'),
			`\`${roleEvent[0]}\` - ${roleEvent[1]}`,
			inline
		]
	}

	getTitleText() {
		return this.getCommandLiteral('MESSAGE.SALLY_EVENTS_TITLE');
	}

	getDescriptionText() {
		return this.getCommandLiteral('MESSAGE.SALLY_EVENTS_DESC');
	}

	getThumbnail() {
		return {
			url: MessageUtil.makeAttachmentString(sally.iconFile)
		};
	}
}

class NextEventView extends NextEventViewHelper {
	makeNextEventEmbed() {
		const self = this,
			nextGeneralEventField = this.getNextGeneralEvent(),
			nextRoleEventField = this.getNextRoleEvent(),
			NextEventEmbed = self.embed
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
