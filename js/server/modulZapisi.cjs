class ModulZapisi {
	putanja = "";
	datotecniSustav = require("fs");
	citanje = require("readline");

	constructor(putanja) {
		this.putanja = putanja + "/resursi/ostalo/zapisi.csv";
	}

	citajDatoteku() {
		const sadrzaj = this.datotecniSustav.readFileSync(this.putanja, "utf-8");
		const redovi = sadrzaj.split("\n");

		const rezultat = [];
		for (let i = 0; i < redovi.length; i++) {
			const podaci = redovi[i].split("#");
			if (podaci.length > 4) {
				rezultat.push({
					id: podaci[0],
					naziv: podaci[1],
					opis: podaci[2],
					kategorija: podaci[3],
					datumUnosa: podaci[4],
				});
			}
		}

		return rezultat;
	}

	dohvatiSve(pojam, kategorija) {
		const redovi = this.citajDatoteku();

		pojam = pojam === undefined ? "" : pojam.toLowerCase();
		kategorija = kategorija === undefined ? "" : kategorija.toLowerCase();

		if (pojam === "" && kategorija === "") {
			return redovi;
		}

		const rezultat = [];

		for (let i = 0; i < redovi.length; i++) {
			const red = redovi[i];
			if (kategorija === "") {
				if (red.naziv.toLowerCase().indexOf(pojam) !== -1 || red.opis.toLowerCase().indexOf(pojam) !== -1) {
					rezultat.push(red);
				}
			} else if (pojam === "") {
				if (red.kategorija.toLowerCase().indexOf(kategorija) !== -1) {
					rezultat.push(red);
				}
			} else if (
				(red.naziv.toLowerCase().indexOf(pojam) !== -1 || red.opis.toLowerCase().indexOf(pojam) !== -1) &&
				red.kategorija.toLowerCase().indexOf(kategorija) !== -1
			) {
				rezultat.push(red);
			}
		}

		return rezultat;
	}

	dohvatiPoIdentifikatoru(id) {
		const redovi = this.citajDatoteku();

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
		if (noveVrijednosti === undefined) {
			return null;
		}

		if (
			noveVrijednosti.naziv == null ||
			noveVrijednosti.opis == null ||
			noveVrijednosti.kategorija == null ||
			noveVrijednosti.datumUnosa == null
		) {
			return null;
		}

		if (
			noveVrijednosti.naziv === "" ||
			noveVrijednosti.opis === "" ||
			noveVrijednosti.kategorija === "" ||
			noveVrijednosti.datumUnosa === ""
		) {
			return null;
		}

		let maxId = 0;
		const redovi = this.citajDatoteku();

		for (let i = 0; i < redovi.length; i++) {
			if (parseInt(redovi[i].id) > maxId) {
				maxId = parseInt(redovi[i].id);
			}
		}

		maxId += 1;

		const noviObjekt = {
			id: maxId.toString(),
			naziv: noveVrijednosti.naziv,
			opis: noveVrijednosti.opis,
			kategorija: noveVrijednosti.kategorija,
			datumUnosa: noveVrijednosti.datumUnosa,
		};

		const noviRed =
			"\n" +
			noviObjekt.id +
			"#" +
			noviObjekt.naziv +
			"#" +
			noviObjekt.opis +
			"#" +
			noviObjekt.kategorija +
			"#" +
			noviObjekt.datumUnosa;

		this.datotecniSustav.writeFileSync(this.putanja, noviRed, {
			flag: "a+",
			encoding: "utf-8",
		});

		return noviObjekt;
	}

	azurirajPostojeci(id, noveVrijednosti) {
		if (noveVrijednosti === undefined) {
			return false;
		}

		if (
			noveVrijednosti.naziv == null ||
			noveVrijednosti.opis == null ||
			noveVrijednosti.kategorija == null ||
			noveVrijednosti.datumUnosa == null
		) {
			return false;
		}

		if (
			noveVrijednosti.naziv === "" ||
			noveVrijednosti.opis === "" ||
			noveVrijednosti.kategorija === "" ||
			noveVrijednosti.datumUnosa === ""
		) {
			return false;
		}

		const redovi = this.citajDatoteku();

		let noviZapisi = "";
		let pronadjenZapis = false;

		const azuriraniObjekt = {
			id: id.toString(),
			naziv: noveVrijednosti.naziv,
			opis: noveVrijednosti.opis,
			kategorija: noveVrijednosti.kategorija,
			datumUnosa: noveVrijednosti.datumUnosa,
		};

		for (let i = 0; i < redovi.length; i++) {
			if (redovi[i].id === id.toString()) {
				pronadjenZapis = true;
				noviZapisi +=
					azuriraniObjekt.id +
					"#" +
					azuriraniObjekt.naziv +
					"#" +
					azuriraniObjekt.opis +
					"#" +
					azuriraniObjekt.kategorija +
					"#" +
					azuriraniObjekt.datumUnosa;
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

		if (pronadjenZapis) {
			this.datotecniSustav.writeFileSync(this.putanja, noviZapisi, "utf-8");
			return azuriraniObjekt;
		}
		return null;
	}

	ukloniPoIdentifikatoru(id) {
		const redovi = this.citajDatoteku();

		let noviZapisi = "";
		let brojacUnesenihRedova = 0;
		let pronadjenZapis = false;

		for (let i = 0; i < redovi.length; i++) {
			if (redovi[i].id === id.toString()) {
				pronadjenZapis = true;
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

		if (pronadjenZapis) {
			this.datotecniSustav.writeFileSync(this.putanja, noviZapisi, "utf-8");
			return true;
		}
		return false;
	}
}

module.exports = ModulZapisi;
