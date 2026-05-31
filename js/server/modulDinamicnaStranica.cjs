class DinamicnaStranica {
	putanja = "";
	datotecniSustav = require("fs");

	constructor(putanja) {
		this.putanja = putanja + "/resursi/ostalo";
	}

	DohvatiPocetakStranice() {
		const pocetakStraniceOznake = this.datotecniSustav.readFileSync(
			this.putanja + "/pocetakStraniceOznake.txt",
			"utf-8",
		);

		return pocetakStraniceOznake;
	}

	DohvatiMogucnostiPregleda() {
		const mogucnostiPregledaOznake = this.datotecniSustav.readFileSync(
			this.putanja + "/mogucnostiPregledaOznake.txt",
			"utf-8",
		);

		return mogucnostiPregledaOznake;
	}

	DohvatiTablicu(podaci) {
		let tablicaOznake = `
		<table border="1">
			<tr>
				<th>Id</th>
				<th>Naziv</th>
				<th>Opis</th>
				<th>Kategorija</th>
				<th>Datum unosa</th>
				<th>Prikaz</th>
				<th>Brisanje</th>
			</tr>
		`;

		if (podaci.length === 0) {
			tablicaOznake += "<tr><td colspan='7'>Nema rezultata za uneseni pojam i/ili kategoriju!</td></tr>";
		} else {
			for (const red of podaci) {
				tablicaOznake += `<tr>
				<td>${red.id}</td>
				<td>${red.naziv}</td>
				<td>${red.opis}</td>
				<td>${red.kategorija}</td>
				<td>${red.datumUnosa}</td>
				<td>
					<a href="/pregled/${red.id}">Prikaži</a>
				</td>
				<td>
					<form method="post" action="/pregled/obrisi/${red.id}">
						<input type="submit" value="Obriši">
					</form>
				</td>
			</tr>
			`;
			}
		}

		tablicaOznake += "</table>";

		return tablicaOznake;
	}

	DohvatiKrajStranice() {
		const krajStraniceOznake = `
			</main>
				<footer>
					<a target="_blank" id="vezaZaValidaciju" href="">
						<img src="https://spider.foi.hr/OWT/materijali/slike/HTML5.png" alt="Ikona HTML5 validatora">
					</a>
				</footer>
			</body>
		</html>`;

		return krajStraniceOznake;
	}

	DohvatiPregledPoId(podatak) {
		let pregledPoIdOznake = "";

		if (podatak === null) {
			pregledPoIdOznake += "<p><span class='kurzivniTekst'>Traženi zapis nije pronađen!</span></p>";
		} else {
			pregledPoIdOznake += `
			<p><span class="masniTekst">Id</span>: ${podatak.id}</p>
			<p><span class="masniTekst">Naziv</span>: ${podatak.naziv}</p>
			<p><span class="masniTekst">Opis</span>: ${podatak.opis}</p>
			<p><span class="masniTekst">Kategrija</span>: ${podatak.kategorija}</p>
			<p><span class="masniTekst">Datum unosa</span>: ${podatak.datumUnosa}</p>
			`;
		}

		pregledPoIdOznake += "<a href='/pregled' class='vezaZaPovratak'>Povratak na pregled</a>";

		return pregledPoIdOznake;
	}
}

module.exports = DinamicnaStranica;
