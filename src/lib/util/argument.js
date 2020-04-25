/* eslint one-var: "off" */

const { lowerCase } = require('voca');

const EMPTY_STRING = '',
	DELIMITER_SPACE = ' ',
	REGEX_SET = /set|\s|_/gi;

const ArgumentUtil = {
	cleanParams(params) {
		return lowerCase(
			params
				.trim()
				.split(DELIMITER_SPACE)
				.join(EMPTY_STRING)
		);
	},

	removeString(str, regex) {
		return str.replace(regex, EMPTY_STRING);
	},

	cleanSetName(dirtySetName) {
		return lowerCase(
			this.removeString(dirtySetName, REGEX_SET)
		);
	}
};

module.exports = ArgumentUtil;
