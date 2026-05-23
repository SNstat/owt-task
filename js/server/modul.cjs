/*
fs.readFile("/podaci", "utf-8", (greska, podaci) => {
	if (greska) {
		console.log(greska);
	} else {
		console.log(podaci);
	}
});
*/

class Modul {
	constructor() {
		const fs = require("fs");
		const podaci = fs.readFileSync("/podaci", "utf-8");
	}

	dohvatiSve() {}

	dohvatiPoIdentifikatoru(id) {}

	dodajNovi() {}

	azurirajPostojeci(id) {}

	ukloniPoIdentifikatoru(id) {}
}

module.exports = Modul;
