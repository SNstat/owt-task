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

const ModulZapisi = require("./js/server/modulZapisi.cjs");
const ModulDinamicnaStranica = require("./js/server/modulDinamicnaStranica.cjs");

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

server.get("/obrValidacija", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/html/kontakt.html");
});

//dinamicne stranice /pregled

server.get("/pregled", (zahtjev, odgovor) => {
	const modulZapisi = new ModulZapisi(putanja);
	const modulDinamicnaStranica = new ModulDinamicnaStranica();

	const podaci = modulZapisi.dohvatiSve(zahtjev.query.pojam, zahtjev.query.kategorija);

	odgovor.write(modulDinamicnaStranica.DohvatiPocetakStranice());
	odgovor.write(modulDinamicnaStranica.DohvatiMogucnostiPregleda());
	odgovor.write(modulDinamicnaStranica.DohvatiTablicu(podaci));
	odgovor.write(modulDinamicnaStranica.DohvatiKrajStranice());

	odgovor.end();
});

server.get("/pregled/:id", (zahtjev, odgovor) => {
	const modulZapisi = new ModulZapisi(putanja);
	const modulDinamicnaStranica = new ModulDinamicnaStranica();

	const id = zahtjev.params.id;
	const podatak = modulZapisi.dohvatiPoIdentifikatoru(id);

	odgovor.write(modulDinamicnaStranica.DohvatiPocetakStranice());
	odgovor.write(modulDinamicnaStranica.DohvatiPregledPoId(podatak));
	odgovor.write(modulDinamicnaStranica.DohvatiKrajStranice());

	odgovor.end();
});

server.post("/pregled/obrisi/:id", (zahtjev, odgovor) => {
	const modulZapisi = new ModulZapisi(putanja);

	modulZapisi.ukloniPoIdentifikatoru(zahtjev.params.id);

	odgovor.redirect("/pregled");
});

//REST servis /api/zapisi

server.get("/api/zapisi", (zahtjev, odgovor) => {
	const modulZapisi = new ModulZapisi(putanja);

	const podaci = modulZapisi.dohvatiSve(zahtjev.query.pojam, zahtjev.query.kategorija);

	odgovor.type("json");
	odgovor.status(200).send(podaci);
});

server.post("/api/zapisi", (zahtjev, odgovor) => {
	const modulZapisi = new ModulZapisi(putanja);

	const noveVrijednosti = zahtjev.body;

	const noviObjekt = modulZapisi.dodajNovi(noveVrijednosti);

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
	const modulZapisi = new ModulZapisi(putanja);

	const id = zahtjev.params.id;
	const podatak = modulZapisi.dohvatiPoIdentifikatoru(id);

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
	const modulZapisi = new ModulZapisi(putanja);

	const id = zahtjev.params.id;
	const noveVrijednosti = zahtjev.body;

	const azuriraniObjekt = modulZapisi.azurirajPostojeci(id, noveVrijednosti);

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
	const modulZapisi = new ModulZapisi(putanja);

	const id = zahtjev.params.id;
	const statusBrisanja = modulZapisi.ukloniPoIdentifikatoru(id);

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
