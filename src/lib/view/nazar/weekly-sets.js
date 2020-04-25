/* eslint max-classes-per-file: ["error", 2] */

const { lowerCase } = require('voca');
const CoreView = require('../core/view');

const DELIMITER_NEW_LINE = '\n';

class WeeklySetsViewHelper extends CoreView {
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

	makeWeeklySetsEmbed() {
		const self = this,
			inline = true,
			LocationViewEmbed = this.embed;

		for (const [setName, items] of Object.entries(self.model.chests)) {
			LocationViewEmbed.addFields({
				name: setName,
				value: items.join(DELIMITER_NEW_LINE),
				inline
			});
		}

		return LocationViewEmbed;
	}

	makeWeeklySetEmbed(setName = 'current') {
		const self = this,
			inline = true,
			LocationViewEmbed = this.embed,
			cleanSetName = (dirtySetName) => lowerCase(dirtySetName.split(' ').join('')),
			current = 'Night Watch Set';

		if (setName === 'current') {
			LocationViewEmbed
				.setTitle(current)
				.setDescription(self.getCommandLiteral('MESSAGE.NAZAR_SET_CURRENT_DESC'))
				.addFields({
					name: self.getCommandLiteral('LABEL.COLLECTIBLES'),
					value: self.model.chests[current].join(DELIMITER_NEW_LINE),
					inline
				});
		} else {
			const chest = Object.entries(self.model.chests).find((nazarChest) => {
				return cleanSetName(nazarChest[0]) === cleanSetName(`${setName}set`);
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
			{ type } = self;

		switch (type) {
			case 'all':
				return self.makeWeeklySetsEmbed();
			default:
				return self.makeWeeklySetEmbed(type);
		}
	}
}

module.exports = WeeklySetsView;
