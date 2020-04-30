/* eslint one-var: "off" */

const { lowerCase } = require('voca');
const {
	DELIMITER,
	REGEX
} = require('../settings/general');

const ArgumentUtil = {
	cleanParams(params) {
		return lowerCase(
			params
				.trim()
				.split(DELIMITER.SPACE)
				.join(DELIMITER.EMPTY_STRING)
		);
	},

	removeString(str, regex) {
		return str.replace(regex, DELIMITER.EMPTY_STRING);
	},

	cleanSetName(dirtySetName) {
		return lowerCase(
			this.removeString(dirtySetName, REGEX.SET)
		);
	}
};

module.exports = ArgumentUtil;
