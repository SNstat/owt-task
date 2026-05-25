class DinamicnaStranica {
	DohvatiPocetakStranice() {
		const pocetakStraniceOznake = `
			<!doctype html>
			<html lang="hr">

			<head>
				<title>Dinamična stranica</title>
				<meta charset="UTF-8">
				<meta name="author" content="Šimun Ćosić">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link rel="stylesheet" type="text/css" href="/dizajn/scosic24.css">
				<link rel="stylesheet" type="text/css" href="/dizajn/dinamicnaStranica.css">
				<script src="/JSklijent/scosic24.js"></script>
			</head>

			<body>
				<header>
					<nav>
						<button id="tipkaZaMobilniIzbornik"><img src="/resursi/slike/ikonaIzbornik.png" alt="ikona izbornik"></button>
						<h1>HiPo</h1>
						<ul>
							<li><a href="/">HIPO</a></li>
							<li><a href="/">Početna stranica</a></li>
							<li><a href="/proizvod">Proizvod</a></li>
							<li><a href="/upute">Upute</a></li>
							<li><a href="/katalog">Katalog</a></li>
							<li><a href="/tim">Tim</a></li>
							<li><a href="/kontakt">Kontakt</a></li>
							<li><a href="/dokumentacija">Dokumentacija</a></li>
							<li><a href="/obrValidacija">obrValidacija</a></li>
							<li><a href="/pregled">Dinamična stranica</a></li>
							<li><a href="/api/zapisi">REST servis</a></li>
						</ul>
					</nav>
				</header>
				<main>`;

		return pocetakStraniceOznake;
	}

	DohvatiMogucnostiPregleda() {
		const mogucnostiPregledaOznake = `
			<form method="get" action="/pregled" id="formaMogucnostiPregleda">
			<label for="unosPojma">Pojam pretraživanja:</label>
			<input type="text" id="unosPojma" name="pojam">

			<br>

			<label for="odabirKategorije">Kategorija:</label>
			<select name="kategorija" id="odabirKategorije">
				<option value="">neodabrano</option>
				<option value="paket">paket</option>
				<option value="oprema">oprema</option>
				<option value="sjemenje">sjemenje</option>
				<option value="usluga">usluga</option>
			</select>

			<br>

			<input type="submit" value="Primjeni">
			</form>
			<br>`;

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

		tablicaOznake += "</table>";

		return tablicaOznake;
	}

	DohvatiKrajStranice() {
		const krajStraniceOznake = `
			</main>
				<footer>
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
