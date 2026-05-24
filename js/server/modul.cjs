class Modul {
	putanja = "";
	arr = [];
	datotecniSustav = require("fs");
	citanje = require("readline");

	constructor(putanja) {
		this.putanja = putanja;
	}

	#citajDatoteku() {
		const sadrzaj = this.datotecniSustav.readFileSync(this.putanja + "/js/server/zapisi.csv", "utf-8");
		const redovi = sadrzaj.split("\n");

		const rezultat = [];
		for (let i = 0; i < redovi.length; i++) {
			const podaci = redovi[i].split("#");
			rezultat.push({ id: podaci[0], naziv: podaci[1], opis: podaci[2], kategorija: podaci[3], datumUnosa: podaci[4] });
		}

		return rezultat;
	}

	dohvatiSve(pojam, kategorija) {
		const redovi = this.#citajDatoteku();

		pojam = pojam === undefined ? "" : pojam;
		kategorija = kategorija === undefined ? "" : kategorija;

		if (pojam === "" && kategorija === "") {
			return redovi;
		} else {
			const rezultat = [];

			for (let i = 0; i < redovi.length; i++) {
				const red = redovi[i];
				if (kategorija === "") {
					if (red.naziv.indexOf(pojam) !== -1 || red.opis.indexOf(pojam) !== -1) {
						rezultat.push(red);
					}
				} else if (pojam === "") {
					if (red.kategorija.indexOf(kategorija) !== -1) {
						rezultat.push(red);
					}
				} else if (
					(red.naziv.indexOf(pojam) !== -1 || red.opis.indexOf(pojam) !== -1) &&
					red.kategorija.indexOf(kategorija) !== -1
				) {
					rezultat.push(red);
				}
			}

			return rezultat;
		}
	}

	dohvatiPoIdentifikatoru(id) {
		const redovi = this.#citajDatoteku();
		let povrat = null;

		for (let i = 0; i < redovi.length; i++) {
			if (redovi[i].id === id.toString()) {
				povrat = redovi[i];
				break;
			}
		}

		return povrat;
	}

	dodajNovi(noveVrijednosti) {
		let maxId = 0;
		const redovi = this.#citajDatoteku();

		for (let i = 0; i < redovi.length; i++) {
			if (parseInt(redovi[i].id) > maxId) {
				maxId = parseInt(redovi[i].id);
			}
		}

		maxId += 1;

		const noviRed =
			"\n" +
			maxId +
			"#" +
			noveVrijednosti.naziv +
			"#" +
			noveVrijednosti.opis +
			"#" +
			noveVrijednosti.kategorija +
			"#" +
			noveVrijednosti.datumUnosa;

		this.datotecniSustav.appendFileSync(this.putanja + "/js/server/zapisi.csv", noviRed, "utf-8");
	}

	azurirajPostojeci(id, noveVrijednosti) {
		const redovi = this.#citajDatoteku();

		let noviZapisi = "";

		for (let i = 0; i < redovi.length; i++) {
			if (redovi[i].id === id) {
				noviZapisi +=
					id +
					"#" +
					noveVrijednosti.naziv +
					"#" +
					noveVrijednosti.opis +
					"#" +
					noveVrijednosti.kategorija +
					"#" +
					noveVrijednosti.datumUnosa;
			} else {
				noviZapisi +=
					redovi[i].id +
					"#" +
					redovi[i].naziv +
					"#" +
					redovi[i].opis +
					"#" +
					redovi[i].kategorija +
					"#" +
					redovi[i].datumUnosa;
			}
			if (i < redovi.length - 1) {
				noviZapisi += "\n";
			}
		}

		this.datotecniSustav.writeFileSync(this.putanja + "/js/server/zapisi.csv", noviZapisi, "utf-8");
	}

	ukloniPoIdentifikatoru(id) {
		const redovi = this.#citajDatoteku();

		let noviZapisi = "";
		let brojacUnesenihRedova = 0;

		for (let i = 0; i < redovi.length; i++) {
			if (redovi[i].id === id) {
				continue;
			} else {
				if (brojacUnesenihRedova > 0) {
					noviZapisi += "\n";
				}
				brojacUnesenihRedova++;
				noviZapisi +=
					redovi[i].id +
					"#" +
					redovi[i].naziv +
					"#" +
					redovi[i].opis +
					"#" +
					redovi[i].kategorija +
					"#" +
					redovi[i].datumUnosa;
			}
		}

		this.datotecniSustav.writeFileSync(this.putanja + "/js/server/zapisi.csv", noviZapisi, "utf-8");
	}
}

module.exports = Modul;
