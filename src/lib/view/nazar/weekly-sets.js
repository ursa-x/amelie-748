/* eslint max-classes-per-file: ["error", 2] */

const {
	MessageEmbed,
	MessageAttachment
} = require('discord.js');
const moment = require('moment');
const {lowerCase} = require('voca');
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
	constructor(weeklySetsModel, type) {
		super(weeklySetsModel);

		this.type = type;
	}

	makeWeeklySetsEmbed(LocationViewEmbed) {
		const self = this,
			inline = true,
			DELIMITER_NEW_LINE = '\n';

		for (const [setName, items] of Object.entries(self.model.chests)) {
			LocationViewEmbed.addFields({
				name: setName,
				value: items.join(DELIMITER_NEW_LINE),
				inline
			});
		}

		return LocationViewEmbed;
	}

	makeWeeklySetEmbed(LocationViewEmbed, setName = 'current') {
		const self = this,
			inline = true,
			DELIMITER_NEW_LINE = '\n',
			cleanSetName = (setName) => lowerCase(setName.split(' ').join('')),
			current = 'Night Watch Set';

		if(setName === 'current') {
			LocationViewEmbed
				.setTitle(current)
				.setDescription(self.getCommandLiteral('MESSAGE.NAZAR_SET_CURRENT_DESC'))
				.addFields({
					name: self.getCommandLiteral('LABEL.COLLECTIBLES'),
					value: self.model.chests[current].join(DELIMITER_NEW_LINE),
					inline
				});
		} else {
			const chest = Object.entries(self.model.chests).find((chest) => {
				return cleanSetName(chest[0]) === cleanSetName(`${setName}set`);
			});

			if (typeof chest !== 'undefined') {
				LocationViewEmbed
					.setTitle(chest[0])
					.setDescription(self.getCommandLiteral('MESSAGE.NAZAR_SET_DESC'))
					.addFields({
						name: self.getCommandLiteral('LABEL.COLLECTIBLES'),
						value: chest[1].join(DELIMITER_NEW_LINE),
						inline
					});
			} else {
				LocationViewEmbed
					.setTitle(current)
					.setDescription(self.getCommandLiteral('MESSAGE.NAZAR_SET_CURRENT_DESC'))
					.addFields({
						name: self.getCommandLiteral('LABEL.COLLECTIBLES'),
						value: self.model.chests[current].join(DELIMITER_NEW_LINE),
						inline
					});
			}
		}

		return LocationViewEmbed;
	}

	get messageEmbed() {
		const self = this,
			type = self.type,
			embedOptions = {
				color: 'RANDOM',
				title: self.getTitleText(),
				author: self.getAuthor(),
				description: self.getDescriptionText(),
				timestamp: moment().toDate(),
				footer: self.getFooter()
			},
			LocationViewEmbed = new MessageEmbed(embedOptions);

		switch (type) {
			case 'all':
				return self.makeWeeklySetsEmbed(LocationViewEmbed);
			default:
				return self.makeWeeklySetEmbed(LocationViewEmbed, type);
		}
	}

	get imageAttachment() {
		return new MessageAttachment('./assets/charlotte-balfour.png');
	}
}

module.exports = WeeklySetsView;
