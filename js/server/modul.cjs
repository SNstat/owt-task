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
		try {
			const redovi = this.#citajDatoteku();

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
		} catch {
			return null;
		}
	}

	dohvatiPoIdentifikatoru(id) {
		try {
			const redovi = this.#citajDatoteku();

			let povrat = null;

			for (let i = 0; i < redovi.length; i++) {
				if (redovi[i].id === id.toString()) {
					povrat = redovi[i];
					break;
				}
			}

			return povrat;
		} catch {
			return null;
		}
	}

	dodajNovi(noveVrijednosti) {
		try {
			if (
				noveVrijednosti.naziv === "" ||
				noveVrijednosti.opis === "" ||
				noveVrijednosti.kategorija === "" ||
				noveVrijednosti.datumUnosa === ""
			) {
				return null;
			}

			let maxId = 0;
			const redovi = this.#citajDatoteku();

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

			this.datotecniSustav.writeFileSync(this.putanja + "/js/server/zapisi.csv", noviRed, {
				flag: "a+",
				encoding: "utf-8",
			});

			return noviObjekt;
		} catch {
			return null;
		}
	}

	azurirajPostojeci(id, noveVrijednosti) {
		try {
			if (
				noveVrijednosti.naziv === "" ||
				noveVrijednosti.opis === "" ||
				noveVrijednosti.kategorija === "" ||
				noveVrijednosti.datumUnosa === ""
			) {
				return "kriviPodaci";
			}

			const redovi = this.#citajDatoteku();

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
				this.datotecniSustav.writeFileSync(this.putanja + "/js/server/zapisi.csv", noviZapisi, "utf-8");
				return azuriraniObjekt;
			}
			return "nemaZapisaPoId";
		} catch {
			return null;
		}
	}

	ukloniPoIdentifikatoru(id) {
		try {
			const redovi = this.#citajDatoteku();

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
				this.datotecniSustav.writeFileSync(this.putanja + "/js/server/zapisi.csv", noviZapisi, "utf-8");
				return true;
			}
			return false;
		} catch {
			return false;
		}
	}
}

module.exports = Modul;
