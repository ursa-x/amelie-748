/* eslint max-classes-per-file: ["error", 2] */

import { MessageAttachment } from 'discord.js';
import CoreView from '../core/view';
import { nazar } from '../../settings/persona';
import MessageUtil from '../../util/message';

class LocationViewHelper extends CoreView {
	getDayField(inline = true) {
		const self = this;

		return {
			name: self.getCommandLiteral('LABEL.DAY'),
			value: self.model.currentDate,
			inline
		};
	}

	getStateField(inline = true) {
		const self = this;

		return {
			name: self.getCommandLiteral('LABEL.STATE'),
			value: self.model.state,
			inline
		};
	}

	getRegionField(inline = true) {
		const self = this;

		return {
			name: self.getCommandLiteral('LABEL.REGION'),
			value: self.model.region,
			inline
		};
	}

	getLandmarkField(inline = true) {
		const self = this,
			getNearByText = (obj) => obj.model.landmarks.join(', ');

		return {
			name: self.getCommandLiteral('LABEL.NEAR_BY'),
			value: getNearByText(self),
			inline
		};
	}

	getImage() {
		return {
			url: this.model.imageURL
		};
	}

	getFooter() {
		return {
			text: this.footerText
		};
	}

	getTitleText() {
		return this.getCommandLiteral('MESSAGE.NAZAR_WYA_TITLE');
	}

	getDescriptionText() {
		const commandDescription = this.getCommandLiteral('MESSAGE.NAZAR_WYA_DESC');

		return commandDescription(this.model.state);
	}

	getThumbnail() {
		return {
			url: MessageUtil.makeAttachmentString(nazar.iconFile)
		};
	}
}

class LocationView extends LocationViewHelper {
	get messageEmbed() {
		const self = this,
			LocationViewEmbed = this.embed;

		return LocationViewEmbed
			.addFields([
				self.getRegionField(),
				self.getStateField(),
				self.getLandmarkField(false)
			])
			.setImage(self.getImage().url);
	}

	get messageAttachments() {
		const { imageAttachments } = this,
			nazarThumbnailAttachment = new MessageAttachment(`./${nazar.iconFolder}${nazar.iconFile}`);

		imageAttachments.push(nazarThumbnailAttachment);

		return imageAttachments;
	}
}

module.exports = LocationView;
