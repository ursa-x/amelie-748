/* eslint max-classes-per-file: ["error", 2] */

import { MessageAttachment } from 'discord.js';
import CoreView from '../core/view';
import * as ArgumentUtil from '../../util/argument';
import * as MessageUtil from '../../util/message';
import {
	DELIMITER,
	QUERY_TYPE
} from '../../settings/general';
import { nazar } from '../../../../data/persona.json';

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
		const self = this,
			inline = true,
			LocationViewEmbed = this.embed;

		for (const [setName, items] of Object.entries(self.model.chests)) {
			LocationViewEmbed.addFields({
				name: setName,
				value: items.join(DELIMITER.NEW_LINE),
				inline
			});
		}

		return LocationViewEmbed;
	}

	makeWeeklySetEmbed(queryParams) {
		const self = this,
			inline = true,
			LocationViewEmbed = self.embed,
			{ currentSetName } = self.model,
			setName = (queryParams.queryType === QUERY_TYPE.SEARCH)
				? queryParams.searchSetName
				: currentSetName,
			lookupSetName = ArgumentUtil.cleanSetName(setName),
			// eslint-disable-next-line arrow-body-style
			findChest = (chestName) => {
				// eslint-disable-next-line arrow-body-style
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
					value: chest[1].join(DELIMITER.NEW_LINE),
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
					value: currentChest[1].join(DELIMITER.NEW_LINE),
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
}

module.exports = WeeklySetsView;
