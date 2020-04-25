/* eslint max-classes-per-file: ["error", 2] */

const CoreView = require('../core/view');
const ArgumentUtil = require('../../util/argument');
const { QUERY_TYPE } = require('../../settings/general');

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
	makeWeeklySetsEmbed() {
		// TODO: Highlight 'current' when displaying all
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

	makeWeeklySetEmbed(options) {
		const self = this,
			inline = true,
			LocationViewEmbed = self.embed,
			currentSetName = self.model.currentSetName,
			setName = (options.queryType === QUERY_TYPE.SEARCH) ? options.searchSetName : currentSetName,
			lookupSetName = ArgumentUtil.cleanSetName(setName),
			findChest = (chestName) => {
				return Object.entries(self.model.chests).find((nazarChest) => {
					return ArgumentUtil.cleanSetName(nazarChest[0]) === chestName;
				});
			},
			chest = findChest(lookupSetName);

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
			const tidyCurrentSetName = ArgumentUtil.cleanSetName(currentSetName),
				currentChest = findChest(tidyCurrentSetName);

			LocationViewEmbed
				.setTitle(currentChest[0])
				.setDescription(self.getCommandLiteral('MESSAGE.NAZAR_SET_CURRENT_DESC'))
				.addFields({
					name: self.getCommandLiteral('LABEL.COLLECTIBLES'),
					value: currentChest[1].join(DELIMITER_NEW_LINE),
					inline
				});
		}

		return LocationViewEmbed;
	}

	get messageEmbed() {
		const self = this,
			{ options } = self.model,
			{ queryType } = options;

		switch (queryType) {
			case QUERY_TYPE.ALL:
				return self.makeWeeklySetsEmbed();
			default:
				return self.makeWeeklySetEmbed(options);
		}
	}
}

module.exports = WeeklySetsView;
