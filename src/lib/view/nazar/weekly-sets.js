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
				chests,
				embed: LocationViewEmbed
			} = this;

		chests.each((chest) => {
			LocationViewEmbed.addFields({
				name: chest.setName,
				value: chest.items.join(DELIMITER.NEW_LINE),
				inline
			});
		});

		return LocationViewEmbed;
	}

	makeWeeklySetEmbed(queryParams) {
		const self = this,
			inline = true,
			lookupSetName = self.getLookupSetName(queryParams),
			LocationViewEmbed = self.embed,
			{ currentSetName } = self.model,
			chest = this.findChest(lookupSetName);

		if (typeof chest !== 'undefined' && chest.size !== 0) {
			LocationViewEmbed
				.setTitle(chest.firstKey())
				.setDescription(self.getCommandLiteral('MESSAGE.NAZAR_SET_DESC'))
				.addFields({
					name: self.getCommandLiteral('LABEL.COLLECTIBLES'),
					value: chest.first().join(DELIMITER.NEW_LINE),
					inline
				});
		} else {
			const tidyCurrentSetName = ArgumentUtil.cleanSetName(currentSetName),
				currentChest = this.findChest(tidyCurrentSetName);

			LocationViewEmbed
				.setTitle(currentChest.firstKey())
				.setDescription(self.getCommandLiteral('MESSAGE.NAZAR_SET_CURRENT_DESC'))
				.addFields({
					name: self.getCommandLiteral('LABEL.COLLECTIBLES'),
					value: currentChest.first().join(DELIMITER.NEW_LINE),
					inline
				});
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
		const { chests } = this.model;

		return chests.filter((setItems, setName) => {
			return ArgumentUtil.cleanSetName(setName) === chestName;
		});
	}
}

module.exports = WeeklySetsView;
