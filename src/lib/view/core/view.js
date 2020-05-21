import {
	MessageEmbed,
	MessageAttachment
} from 'discord.js';
import { bot } from '../../settings/persona.json';
import * as MessageUtil from '../../util/message';

class CoreView {
	constructor(model) {
		this.model = model;
		this.footerText = this.model.originUser.username;
		this.imageAttachments = [];

		this.getCommandLiteral = (key) => MessageUtil.getCommandLiteral(key, this.model.originMessage);
		this.embedOptions = {
			color: 'RANDOM',
			title: this.getTitleText(),
			author: this.getAuthor(),
			description: this.getDescriptionText(),
			thumbnail: this.getThumbnail(),
			timestamp: this.model.createdTime,
			footer: this.getFooter()
		};
		this.embed = new MessageEmbed(this.embedOptions);

		this.attachDefaultFiles();
	}

	getAuthor() {
		return {
			name: bot.name,
			icon_url: MessageUtil.makeAttachmentString(bot.iconFile)
		};
	}

	getFooter() {
		return {
			text: this.footerText || this.getCommandLiteral('MESSAGE.EMPTY_FOOTER')
		};
	}

	getTitleText() {
		return this.getCommandLiteral('MESSAGE.EMPTY_TITLE');
	}

	getDescriptionText() {
		return this.getCommandLiteral('MESSAGE.EMPTY_DESC');
	}

	getThumbnail() {
		return {
			url: MessageUtil.makeAttachmentString(bot.iconFile)
		};
	}

	attachDefaultFiles() {
		const botIconAttachment = new MessageAttachment(`./${bot.iconFolder}${bot.iconFile}`);

		this.imageAttachments.push(botIconAttachment);
	}

	get messageEmbed() {
		return this.embed;
	}

	get messageAttachments() {
		return this.imageAttachments;
	}
}

export default CoreView;
