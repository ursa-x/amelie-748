/* eslint one-var: "off" */

import {
	utc,
	duration
} from 'moment';

export const nowUTC = () => utc();

export const dateTimeUTC = (dateTimeString, momentFormat) => utc(dateTimeString, momentFormat);

/*
 	A human readable difference between two UTC times that
 	lie within a 24 hour time span
 */
export const humanizedDiff = (now, later) => {
	const diffInMs = utc(later).diff(utc(now));
	return duration(diffInMs, 'milliseconds').humanize(true);
};
