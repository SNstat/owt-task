function dajPort(korime) {
	const os = require("os");
	const HOST = os.hostname();
	let port;
	if (HOST !== "spider") {
		port = 12222;
	} else {
		const portovi = require("/var/www/OWT/2026/portovi.js");
		port = portovi[korime];
	}
	return port;
}

const port = dajPort("scosic24");

const express = require("/usr/lib/node_modules/express");
const server = express();

server.use(express.json());

const putanja = __dirname;

//prava direktorijima

server.use("/JSklijent", express.static(putanja + "/js/klijent"));
server.use("/dizajn", express.static(putanja + "/css"));
server.use("/resursi", express.static(putanja + "/resursi"));

//html stranice

server.get("/", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/html/index.html");
});

server.get("/katalog", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/html/katalog.html");
});

server.get("/kontakt", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/html/kontakt.html");
});

server.get("/proizvod", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/html/proizvod.html");
});

server.get("/tim", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/html/tim.html");
});

server.get("/upute", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/html/upute.html");
});

server.get("/dokumentacija", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/html/dokumentacija.html");
});

//dinamicne stranice /pregled

const pocetakStranice = `<!doctype html>
	<html lang='hr'>
	<head>
	<title>Dinamična stranica</title>
	<meta charset='UTF-8'>
	<meta name='author' content='Šimun Ćosić'>
	</head>
	<body>`;

const krajStranice = "</body></html>";

const opcijePregleda = `
		<form method="get" action="/pregled">
		<label for="unosPojma">Pojam pretraživanja:</label>
		<input type="text" id="unosPojma" name="pojam">

		<label for="odabirKategorije">Kategorija:</label>
		<select name="kategorija" id="odabirKategorije">
			<option value="">neodabrano</option>
			<option value="paket">paket</option>
			<option value="oprema">oprema</option>
			<option value="sjemenje">sjemenje</option>
			<option value="usluga">usluga</option>
		</select>

		<input type="submit" value="Primjeni">
		</form>
		<br>
`;

server.get("/pregled", (zahtjev, odgovor) => {
	const Modul = require("./js/server/modul.cjs");
	const modul = new Modul(putanja);

	const podaci = modul.dohvatiSve(zahtjev.query.pojam, zahtjev.query.kategorija);

	odgovor.write(pocetakStranice);
	odgovor.write(opcijePregleda);

	odgovor.write(`
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
		`);

	for (const red of podaci) {
		odgovor.write(
			`<tr>
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
			`,
		);
	}

	odgovor.write("</table>");

	odgovor.write(krajStranice);
	odgovor.end();
});

server.get("/pregled/:id", (zahtjev, odgovor) => {
	const Modul = require("./js/server/modul.cjs");
	const modul = new Modul(putanja);

	const id = zahtjev.params.id;
	const podatak = modul.dohvatiPoIdentifikatoru(id);

	odgovor.write(pocetakStranice);

	if (podatak === null) {
		odgovor.write("<i>Traženi zapis nije pronađen!</i><br>");
	} else {
		odgovor.write(
			`
			<p>Id: ${podatak.id}</p>
			<p>Naziv: ${podatak.naziv}</p>
			<p>Opis: ${podatak.opis}</p>
			<p>Kategrija: ${podatak.kategorija}</p>
			<p>Datum unosa: ${podatak.datumUnosa}</p>
			`,
		);
	}

	odgovor.write("<a href='/pregled'>Povratak na pregled</a>");

	odgovor.write(krajStranice);
	odgovor.end();
});

server.post("/pregled/obrisi/:id", (zahtjev, odgovor) => {
	const Modul = require("./js/server/modul.cjs");
	const modul = new Modul(putanja);

	modul.ukloniPoIdentifikatoru(zahtjev.params.id);

	odgovor.redirect("/pregled");
});

//REST servis /api/zapisi

server.get("/api/zapisi", (zahtjev, odgovor) => {
	const Modul = require("./js/server/modul.cjs");
	const modul = new Modul(putanja);

	const podaci = modul.dohvatiSve(zahtjev.query.pojam, zahtjev.query.kategorija);

	odgovor.type("json");
	odgovor.status(200).send(podaci);
});

server.post("/api/zapisi", (zahtjev, odgovor) => {
	const Modul = require("./js/server/modul.cjs");
	const modul = new Modul(putanja);

	const noveVrijednosti = zahtjev.body;

	const noviObjekt = modul.dodajNovi(noveVrijednosti);

	odgovor.type("json");

	if (noviObjekt !== null) {
		odgovor.status(201).send(noviObjekt);
	} else {
		odgovor.status(400).send({ greska: "Neispravni ili nepotpuni podaci za zapis." });
	}
});

server.put("/api/zapisi", (zahtjev, odgovor) => {
	odgovor.type("json");
	odgovor.status(405).send({ greska: "Metoda nije dopuštena za kolekciju zapisa." });
});

server.delete("/api/zapisi", (zahtjev, odgovor) => {
	odgovor.type("json");
	odgovor.status(405).send({ greska: "Metoda nije dopuštena za kolekciju zapisa." });
});

//REST servis /api/zapisi/{id}

server.get("/api/zapisi/:id", (zahtjev, odgovor) => {
	const Modul = require("./js/server/modul.cjs");
	const modul = new Modul(putanja);

	const id = zahtjev.params.id;
	const podatak = modul.dohvatiPoIdentifikatoru(id);

	odgovor.type("json");

	if (podatak !== null) {
		odgovor.status(200).send(podatak);
	} else {
		odgovor.status(404).send({ greska: "Zapis s traženim identifikatorom nije pronađen." });
	}
});

server.post("/api/zapisi/:id", (zahtjev, odgovor) => {
	odgovor.type("json");
	odgovor.status(405).send({ greska: "Metoda nije dopuštena za pojedinačni zapis." });
});

server.put("/api/zapisi/:id", (zahtjev, odgovor) => {
	const Modul = require("./js/server/modul.cjs");
	const modul = new Modul(putanja);

	const id = zahtjev.params.id;
	const noveVrijednosti = zahtjev.body;

	const azuriraniObjekt = modul.azurirajPostojeci(id, noveVrijednosti);

	odgovor.type("json");

	if (azuriraniObjekt === null) {
		odgovor.status(404).send({ greska: "Zapis s traženim id-im nije pronađen za ažuriranje." });
	} else if (azuriraniObjekt === noveVrijednosti) {
		odgovor.status(400).send({ greska: "Neispravni podaci za ažuriranje." });
	} else {
		odgovor.status(200).send(azuriraniObjekt);
	}
});

server.delete("/api/zapisi/:id", (zahtjev, odgovor) => {
	const Modul = require("./js/server/modul.cjs");
	const modul = new Modul(putanja);

	const id = zahtjev.params.id;
	const statusBrisanja = modul.ukloniPoIdentifikatoru(id);

	odgovor.type("json");

	if (statusBrisanja) {
		odgovor.status(200).send({ poruka: "Zapis je uspješno obrisan." });
	} else {
		odgovor.status(404).send({ greska: "Zapis s traženim identifikatorom nije pronađen za brisanje." });
	}
});

//za nepostojece putanje

server.use((zahtjev, odgovor) => {
	odgovor.status(404).send("Stranica ne postoji!");
});

server.listen(port, () => {
	console.log("Server pokrenut na portu: " + port);
});
