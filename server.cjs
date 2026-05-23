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

//za nepostojece putanje

server.use((zahtjev, odgovor) => {
	odgovor.status(404).send("Stranica ne postoji!");
});

server.listen(port, () => {
	console.log("Server pokrenut na portu: " + port);
});

console.log(putanja + "/css");

//http://localhost:12222/

/*

server.get("/", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/html/index.html");
});

server.get("/", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/index.html");
});

//dozvola za pristup čitavom direktoriju
server.use("/css", express.static(putanja + "/css"));
//dozvolite pristup do resursa
server.use("/dokumenti", express.static(putanja + "/resursi"));

server.get("/obrazac", (zahtjev, odgovor) => {
	console.log(zahtjev.query);
	odgovor.sendFile(putanja + "/html/obrasci.html");
});

server.get("/javascript", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/js/scosic24.js");
});

const ds = require("fs");
const mojModul = require("./dajTablicu.cjs");

server.get("/dinamicna", (zahtjev, odgovor) => {
	let zaglavlje = ds.readFileSync("zaglavlje.txt", "utf-8");
	let podnozje = ds.readFileSync("podnozje.txt", "utf-8");
	//console.log(zaglavlje, podnozje);

	odgovor.write(zaglavlje);
	odgovor.write("<h2 class='naslov'>Dinamična stranica</h2>");
	odgovor.write(mojModul.dajTablicu());
	odgovor.write(podnozje);

	odgovor.end();
});

//iključivanje posrednika za uključivanje POST parametra:
server.use(express.urlencoded({ extended: true }));

server.post("/ispisObrazac", (zahtjev, odgovor) => {
	console.log(zahtjev.body);
	odgovor.sendFile(putanja + "/html/obrasci.html");
});

server.use((zahtjev, odgovor) => {
	odgovor.send("Stranica nije pronađena!");
});

server.listen(port, () => {
	console.log(`Server pokrenut na portu: ${port}`);
});
*/
