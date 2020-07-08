/* eslint one-var: "off" */

import { lowerCase } from 'voca';
import {
	DELIMITER,
	REGEX
} from '../settings/general';

export const cleanSearchParams = (params) => lowerCase(
	params
		.trim()
		.split(DELIMITER.SPACE)
		.join(DELIMITER.EMPTY_STRING)
);

export const removeString = (str, regex) => str.replace(regex, DELIMITER.EMPTY_STRING);

export const cleanSetName = (dirtySetName) => lowerCase(removeString(dirtySetName, REGEX.SET));
