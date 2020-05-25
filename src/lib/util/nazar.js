/* eslint one-var: "off" */
// TODO: Log the fetch success/failure?

import fetch from 'node-fetch';
import {
	MADAM_NAZAR_API,
	COLLECTOR_MAP_API
} from '../settings/url';

export const fetchNazarLocation = async () => fetch(MADAM_NAZAR_API.currentLocationAPI())
	.then((response) => response.json())
	.then((responseJson) => responseJson)
	.catch((err) => {
		console.error(err);
		return null;
	});

// eslint-disable-next-line max-len
export const fetchCurrentWeeklySet = async () => fetch(COLLECTOR_MAP_API.getCurrentWeeklySetAPI())
	.then((response) => response.json())
	.then((responseJson) => responseJson.current)
	.catch((err) => {
		console.error(err);
		return null;
	});
