const CoreView = require('./core/view');
const { has } = require('../util/general');
const { DELIMITER } = require('../settings/general');
const { CATEGORIES } = require('../settings/commands');

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
			maxCommandLength = _breathingSpace + serverPrefix.length;

		for (const [category, subCategories] of Object.entries(catalogue)) {

			// Ignore __appendix with list of all commands
			if(!category.startsWith(DELIMITER.DOUBLE_UNDERSCORE)) {
				const categoryName = has(CATEGORIES, category) ? CATEGORIES[category] : category;

				// Iterate through each sub category; defaults fall under 'General'
				for (const [subCategory, commands] of Object.entries(subCategories)) {
					const subCategoryCommandList = commands.reduce((commandListText, commandModel) => {
						const commandName = `${serverPrefix}${commandModel.name}`,
							formattedCommandName = commandName.padEnd(maxCommandLength) + TILDE,
							commandDescription = commandModel.description;

						return commandListText
							+ `\n**${formattedCommandName}** ${commandDescription}`
					}, NEW_LINE);

					HelpEmbed.addField(
						`\n\`${categoryName}\`\n`,
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

module.exports = HelpView;
