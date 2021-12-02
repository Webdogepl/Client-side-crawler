const cheerio = require("cheerio");

function searchLogic(res, c) {
	const $ = cheerio.load(res.body);

	const emails = $.html().match(
		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
	);

	const phoneNumbers = $.html().match(
		/\b(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}\b/
	);

	$("a").each(function () {
		let body = document.getElementById("results__body");
		let row = body.insertRow(-1);

		let cell1 = row.insertCell(-1);
		cell1.className = "cell1";

		let cell2 = row.insertCell(-1);
		cell2.className = "cell2";

		let cell3 = row.insertCell(-1);
		cell3.className = "cell3";

		cell1.innerHTML = $(this).attr("href");
	});

	if (emails !== null) {
		for (let i = 0; i <= emails.length; i++) {
			let cell2 = document.getElementsByClassName("cell2")[i];
			if (emails[i] !== undefined) {
				cell2.innerHTML = emails[i];
			}
		}
	}

	if (phoneNumbers !== null) {
		for (let i = 0; i <= phoneNumbers.length; i++) {
			let cell3 = document.getElementsByClassName("cell3")[i];
			if (phoneNumbers[i] !== undefined) {
				cell3.innerHTML = phoneNumbers[i];
			}
		}
	}
}

export default searchLogic;
