const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
const es = require("dayjs/locale/es");

dayjs.extend(relativeTime);
dayjs.locale(es);

function minutesAgo(loginDate) {
	const postTime = dayjs(loginDate);
	return postTime.fromNow();
}

module.exports = minutesAgo;
