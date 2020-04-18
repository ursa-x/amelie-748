/* eslint max-classes-per-file: ["error", 2] */

const {
	MessageEmbed,
	MessageAttachment
} = require('discord.js');
const moment = require('moment');
const MessageUtil = require('../../util/message');

class WeeklySetsViewHelper {
	constructor(weeklySetsModel) {
		this.model = weeklySetsModel;
		this.footerText = this.model.originUser.username;
		this.getCommandLiteral = (key) => MessageUtil.getCommandLiteral(key, this.model.originMessage);
	}

	getAuthor() {
		return {
			name: 'Charlotte Balfour',
			icon_url: 'attachment://charlotte-balfour.png'
		};
	}

	getFooter() {
		return {
			text: this.footerText
		};
	}

	getTitleText() {
		return this.getCommandLiteral('MESSAGE.NAZAR_SETS_TITLE');
	}

	getDescriptionText() {
		return this.getCommandLiteral('MESSAGE.NAZAR_SETS_DESC');
	}
}

class WeeklySetsView extends WeeklySetsViewHelper {
	get messageEmbed() {
		const self = this,
			inline = true,
			DELIMITER_NEW_LINE = '\n',
			embedOptions = {
				color: 'RANDOM',
				title: self.getTitleText(),
				author: self.getAuthor(),
				description: self.getDescriptionText(),
				timestamp: moment().toDate(),
				footer: self.getFooter()
			},
			LocationViewEmbed = new MessageEmbed(embedOptions);

		for (const [setName, items] of Object.entries(self.model.chests)) {
			LocationViewEmbed.addFields({
				name: setName,
				value: items.join(DELIMITER_NEW_LINE),
				inline
			});
		}

		return LocationViewEmbed;
	}

	get imageAttachment() {
		return new MessageAttachment('./assets/charlotte-balfour.png');
	}
}

module.exports = WeeklySetsView;
