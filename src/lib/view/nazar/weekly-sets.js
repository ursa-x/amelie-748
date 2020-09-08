/* eslint max-classes-per-file: ["error", 2] */

import { MessageAttachment } from 'discord.js';
import CoreView from '../core/view';
import * as ArgumentUtil from '../../util/argument';
import * as MessageUtil from '../../util/message';
import {
	DELIMITER,
	QUERY_TYPE
} from '../../settings/general';
import { data } from '../../../../data/persona.json';

const { nazar } = data;

class WeeklySetsViewHelper extends CoreView {
	getTitleText() {
		return this.getCommandLiteral('MESSAGE.NAZAR_SETS_TITLE');
	}

	getDescriptionText() {
		return this.getCommandLiteral('MESSAGE.NAZAR_SETS_DESC');
	}

	getThumbnail() {
		return {
			url: MessageUtil.makeAttachmentString(nazar.iconFile)
		};
	}
}

class WeeklySetsView extends WeeklySetsViewHelper {
	makeWeeklySetsEmbed() {
		// TODO: Highlight 'current' when displaying all
		const inline = true,
			{
				model: {
					chests
				},
				embed: LocationViewEmbed
			} = this;

		chests.each((setItems, setName) => {
			LocationViewEmbed.addFields({
				name: setName,
				value: setItems.join(DELIMITER.NEW_LINE),
				inline
			});
		});

		return LocationViewEmbed;
	}

	makeWeeklySetEmbed(queryParams) {
		const self = this,
			inline = true,
			lookupSetName = self.getLookupSetName(queryParams),
			{
				embed: LocationViewEmbed,
				model: {
					currentSetName
				},
				isChestExist
			} = self,
			chest = self.findChest(lookupSetName),
			currentWeekChest = self.findChest(currentSetName);

		if (isChestExist(chest)) {
			LocationViewEmbed
				.setTitle(chest.firstKey())
				.setDescription(self.getCommandLiteral('MESSAGE.NAZAR_SET_DESC'))
				.addFields({
					name: self.getCommandLiteral('LABEL.COLLECTIBLES'),
					value: chest.first().join(DELIMITER.NEW_LINE),
					inline
				});
		} else if (isChestExist(currentWeekChest)) {
			LocationViewEmbed
				.setTitle(currentWeekChest.firstKey())
				.setDescription(self.getCommandLiteral('MESSAGE.NAZAR_SET_CURRENT_DESC'))
				.addFields({
					name: self.getCommandLiteral('LABEL.COLLECTIBLES'),
					value: currentWeekChest.first().join(DELIMITER.NEW_LINE),
					inline
				});
		} else {
			LocationViewEmbed
				.setTitle(self.getCommandLiteral('MESSAGE.ERROR_NAZAR_WEEKLY_TITLE'))
				.setDescription(self.getCommandLiteral('MESSAGE.ERROR_NAZAR_WEEKLY_DESC'));
		}

		return LocationViewEmbed;
	}

	get messageEmbed() {
		const self = this,
			{ meta: queryParams } = self.model,
			{ queryType } = queryParams;

		switch (queryType) {
		case QUERY_TYPE.ALL:
			return self.makeWeeklySetsEmbed();
		default:
			return self.makeWeeklySetEmbed(queryParams);
		}
	}

	get messageAttachments() {
		const { imageAttachments } = this,
			nazarThumbnailAttachment = new MessageAttachment(`./${nazar.iconFolder}${nazar.iconFile}`);

		imageAttachments.push(nazarThumbnailAttachment);

		return imageAttachments;
	}

	// Helpers
	getLookupSetName(queryParams) {
		const { currentSetName } = this.model,
			setName = (queryParams.queryType === QUERY_TYPE.SEARCH)
				? queryParams.searchSetName
				: currentSetName;

		return ArgumentUtil.cleanSetName(setName);
	}

	findChest(chestName) {
		const { chests } = this.model,
			{ cleanSetName } = ArgumentUtil,
			tidyChestName = cleanSetName(chestName);

		return chests.filter((setItems, setName) => {
			return cleanSetName(setName) === tidyChestName;
		});
	}

	isChestExist(chest) {
		return typeof chest !== 'undefined' && chest.size !== 0;
	}
}

module.exports = WeeklySetsView;
