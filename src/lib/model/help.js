import CoreModel from './core/model';
import { has } from '../util/general';

class Help extends CoreModel {
	constructor(catalogue, message) {
		super(message);

		this.helpCatalogue = catalogue;
		this.longestCommandLength = catalogue.__appendix
			.reduce((long, str) => Math.max(long, str.length), 0);
	}

	get catalogue() {
		return this.helpCatalogue;
	}

	get categories() {
		return Object.keys(this.helpCatalogue);
	}

	get _breathingSpace() {
		return this.longestCommandLength + 1;
	}

	getSubCategories(category) {
		const { helpCatalogue } = this;

		return has(helpCatalogue, category)
			? Object.keys(helpCatalogue[category])
			: null;
	}
}

module.exports = Help;
