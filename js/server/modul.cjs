class Modul {
	putanja = "";
	arr = [];
	datotecniSustav = require("fs");
	citanje = require("readline");

	constructor(putanja) {
		this.putanja = putanja;
	}

	#citajDatoteku() {
		console.log("citajDatoteku.Start");

		const sadrzaj = this.datotecniSustav.readFileSync(this.putanja + "/js/server/zapisi.csv", "utf-8");
		const redovi = sadrzaj.split("\n");
		// console.log(redovi);
		const rezultat = [];
		for (let i = 0; i < redovi.length; i++) {
			const podaci = redovi[i].split("#");
			rezultat.push({ id: podaci[0], naziv: podaci[1], opis: podaci[2], kategorija: podaci[3], datumUnosa: podaci[4] });
		}
		// console.log(rezultat);
		return rezultat;

		// const tokPodatakaKorisnici = this.datotecniSustav.createReadStream(this.putanja + "/js/server/zapisi.csv");
		// const citac = this.citanje.createInterface({ input: tokPodatakaKorisnici });
		// console.log("citajDatoteku.createReadStream");
		// const redovi = [];
		// citac
		// 	.on("line", (red) => {
		// 		const podaci = red.split("#");
		// 		redovi.push({ id: podaci[0], naziv: podaci[1], opis: podaci[2], kategorija: podaci[3], datumUnosa: podaci[4] });
		// 	})
		// 	.on("close", () => {
		// 		console.log(redovi);
		// 		return redovi;
		// 	});
	}

	dohvatiSve(kljucPretrage = null, kategorijaPretrage = null) {
		console.log("dohvatiSve.Start");
		const redovi = this.#citajDatoteku();
		// console.log(redovi);

		if (kljucPretrage === null && kategorijaPretrage === null) {
			console.log("nema pretrage.");
			return redovi;
		} else {
			let rezultat = [];
			//console.log(redovi);
			for (let i; i < redovi.length; i++) {
				const red = redovi[i];
				console.log(red);
				if (red === undefined || red[0] === undefined) {
					console.log("empty row.");
					continue;
				}
				if (
					red[1].indexOf(kljucPretrage) !== -1 ||
					(red[2].indexOf(kljucPretrage) !== -1 && red[3] === kategorijaPretrage)
				) {
					rezultat.push(red);
				}
			}

			console.log(rezultat);
			return rezultat ?? null;
		}
	}

	dohvatiPoIdentifikatoru(id) {
		let povrat = null;

		for (let red of this.arr) {
			//if (red[i] === id) {
			//povrat += red;
			//	break;
			//}

			return povrat;
		}

		//dodajNovi(noveVrijednosti) {}

		//azurirajPostojeci(id, noveVrijednosti) {}

		//ukloniPoIdentifikatoru(id) {};
	}
}

module.exports = Modul;

/*

	dohvatiPoIdentifikatoru(id) {}

	dodajNovi(noveVrijednosti) {}

	azurirajPostojeci(id, noveVrijednosti) {}

	ukloniPoIdentifikatoru(id) {}
}


*/
