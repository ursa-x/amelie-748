/* eslint one-var: "off" */

import {
	titleCase,
	lowerCase
} from 'voca';
import { DELIMITER } from '../settings/general';

export const getCommandLiteral = (path, message) => {
	const keys = path.split(DELIMITER.PERIOD);

	return keys.reduce(
		(previous, current) => (previous ? previous[current] : null),
		message.language.get('COMMANDS')
	);
};

export const getKlasaLiteral = (path, args, message) => {
	const params = (Array.isArray(args)) ? args : [];

	return message.language.get(path, ...params);
};

export const makeAttachmentString = (imageName) => `attachment://${imageName}`;

export const fixTitleCase = (text) => titleCase(lowerCase(text));

export const getTitleCaseFromSnakeCase = (text) => titleCase(
	text
		.split(DELIMITER.UNDERSCORE)
		.join(DELIMITER.SPACE)
);
