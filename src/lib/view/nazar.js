/* eslint max-classes-per-file: ["error", 2] */

const {
	MessageEmbed,
	MessageAttachment
} = require('discord.js');
const moment = require('moment');
const MessageUtil = require('./../util/message');


class LocationViewHelper {
	constructor(locationModel) {
		this.model = locationModel;
		this.footerText = this.model.originUser.username;
		this.getCommandLiteral = (key) => MessageUtil.getCommandLiteral(key, this.model.originMessage);
	}

	getAuthor() {
		return {
			name: 'Charlotte Balfour',
			icon_url: 'attachment://charlotte-balfour.png'
		};
	}

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
}

class LocationView extends LocationViewHelper {
	get messageEmbed() {
		const self = this,
			embedOptions = {
				color: 'RANDOM',
				title: self.getTitleText(),
				author: self.getAuthor(),
				description: self.getDescriptionText(),
				timestamp: moment().toDate(),
				footer: self.getFooter()
			},
			LocationViewEmbed = new MessageEmbed(embedOptions);

		return LocationViewEmbed
			.addFields([
				this.getRegionField(),
				this.getStateField(),
				this.getLandmarkField(false)
			])
			.setImage(this.getImage().url);
	}

	get imageAttachment() {
		return new MessageAttachment('./assets/charlotte-balfour.png');
	}
}

module.exports = LocationView;
