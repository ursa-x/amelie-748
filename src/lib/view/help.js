/* eslint max-classes-per-file: ["error", 2] */

import { upperCase, lowerCase } from 'voca';
import CoreView from './core/view';
import { has } from '../util/general';
import { fixTitleCase } from "../util/message";
import { DELIMITER } from '../settings/general';
import CATEGORIES from '../settings/commands';

class HelpViewHelper extends CoreView {
	getAuthor() {
		return DELIMITER.EMPTY_STRING;
	}

	getTitleText() {
		return this.getCommandLiteral('MESSAGE.HELP_TITLE');
	}

	getDescriptionText() {
		const { prefix: serverPrefix } = this.model.originMessage.guildSettings;

		return this.getCommandLiteral('MESSAGE.HELP_DESC')(serverPrefix);
	}
}

class HelpView extends HelpViewHelper {
	makeHelpEmbed() {
		const {
				model: {
					catalogue,
					_breathingSpace,
					originMessage: {
						guildSettings: {
							prefix: serverPrefix
						}
					}
				},
				embed: HelpEmbed
			} = this,
			{
				NEW_LINE,
				TILDE
			} = DELIMITER,
			maxCommandLength = _breathingSpace + serverPrefix.length

		// Iterate through constant as it holds the display order
		for(const [category, categoryDisplayName] of Object.entries(CATEGORIES)) {
			const tCategory = fixTitleCase(category);

			if(has(catalogue, tCategory)) {

				// Iterate through each sub category; default sub category is 'General'
				// eslint-disable-next-line no-unused-vars
				for (const [subCategory, commands] of Object.entries(catalogue[tCategory])) {
					const subCategoryCommandList = commands.reduce((commandListText, commandModel) => {
						const commandName = `${serverPrefix}${commandModel.name}`,
							formattedCommandName = `**${commandName.padEnd(maxCommandLength)}${TILDE}**`,
							commandDescription = commandModel.description;

						return `${commandListText}\n${formattedCommandName} ${commandDescription}`;
					}, NEW_LINE);

					HelpEmbed.addField(
						`\n\`${categoryDisplayName}\`\n`,
						subCategoryCommandList,
						false
					);
				}
			}
		}

		return HelpEmbed;
	}

	get messageEmbed() {
		return this.makeHelpEmbed();
	}
}

export default HelpView;
