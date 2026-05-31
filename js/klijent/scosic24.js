window.addEventListener("load", function () {
	document.getElementById("tipkaZaMobilniIzbornik").addEventListener("click", promjeniIzbornik);

	postavljanjeVezeZaValidaciju();
	postavljanjeAktivneStranice();

	const padajuciIzbornikZaOdabraniStupac = document.getElementById("padajuciIzbornikZaOdabraniStupac");
	const padajuciIzbornikZaMetoduSortiranja = document.getElementById("padajuciIzbornikZaMetoduSortiranja");
	const unosZaPretrazivanje = document.getElementById("unosZaPretrazivanje");

	if (padajuciIzbornikZaOdabraniStupac) {
		document
			.getElementById("padajuciIzbornikZaOdabraniStupac")
			.addEventListener("change", iniciranjeInteraktivneTablice);
	}

	if (padajuciIzbornikZaMetoduSortiranja) {
		document
			.getElementById("padajuciIzbornikZaMetoduSortiranja")
			.addEventListener("change", iniciranjeInteraktivneTablice);
	}

	if (unosZaPretrazivanje) {
		document.getElementById("unosZaPretrazivanje").addEventListener("keyup", iniciranjeInteraktivneTablice);
	}

	if (padajuciIzbornikZaOdabraniStupac && padajuciIzbornikZaMetoduSortiranja && unosZaPretrazivanje) {
		iniciranjeInteraktivneTablice();
	}
});

//funkcija za dinamicku validaciju HTML stranica

function postavljanjeVezeZaValidaciju() {
	const aktivnaStranica = window.location.pathname;

	const vezaZaValidacijuHtmlStranice = document.getElementById("vezaZaValidaciju");

	vezaZaValidacijuHtmlStranice.setAttribute(
		"href",
		"http://validator.w3.org/check?uri=http://spider.foi.hr:12236" + aktivnaStranica,
	);

	console.log("http://validator.w3.org/check?uri=http://spider.foi.hr:12236" + aktivnaStranica);
}

//funkcije za interaktivni navigacijski izbornik

function postavljanjeAktivneStranice() {
	const aktivnaStranica = window.location.pathname;

	const navigacijskeVeze = document.querySelectorAll("nav a");

	let prviIndexLink = 0;

	for (const navigacijskaVeza of navigacijskeVeze) {
		if (aktivnaStranica === navigacijskaVeza.getAttribute("href")) {
			if (aktivnaStranica === "/" && prviIndexLink === 0) {
				prviIndexLink = 1;
				continue;
			}
			navigacijskaVeza.className += " aktivnaStranica";
			break;
		}
	}
}

function promjeniIzbornik() {
	const navigacijskaTraka = document.querySelector("nav ul");

	if (imaCssKlasu(navigacijskaTraka, "otvorenNavigacijskiIzbornik")) {
		odmakniCssKlasu(navigacijskaTraka, "otvorenNavigacijskiIzbornik");
	} else {
		dodajCssKlasu(navigacijskaTraka, "otvorenNavigacijskiIzbornik");
	}
}

//funkcije za interaktivnu tablicu

function iniciranjeInteraktivneTablice() {
	pretraziTablicu();
	sortirajTablicu();
}

function pretraziTablicu() {
	const odabraniStupac = document.getElementById("padajuciIzbornikZaOdabraniStupac").value;
	const odabranaPolja = document.querySelectorAll("table td:nth-child(" + odabraniStupac + ")");

	const kljucPretrage = document.getElementById("unosZaPretrazivanje").value.toLowerCase();

	let brojacNevidljivihRedaka = 0;

	for (const polje of odabranaPolja) {
		if (polje.innerHTML.toLowerCase().indexOf(kljucPretrage) === -1) {
			dodajCssKlasu(polje.parentElement, "nevidljiviRedak");
			brojacNevidljivihRedaka++;
		} else {
			odmakniCssKlasu(polje.parentElement, "nevidljiviRedak");
		}
	}

	const izjavaNemaRezultata = document.querySelector(".izjavaNemaRezultata");

	if (brojacNevidljivihRedaka === odabranaPolja.length) {
		dodajCssKlasu(izjavaNemaRezultata, "vidljivaIzjavaRezultata");
	} else {
		odmakniCssKlasu(izjavaNemaRezultata, "vidljivaIzjavaRezultata");
	}
}

function sortirajTablicu() {
	const odabraniStupac = document.getElementById("padajuciIzbornikZaOdabraniStupac").value;
	const odabranaPolja = document.querySelectorAll("table td:nth-child(" + odabraniStupac + ")");

	const tablicaTijelo = document.querySelector("table tbody");
	const tablicaTijeloSadrzaj = document.querySelectorAll("table tbody tr");

	const metodaSortiranja = document.getElementById("padajuciIzbornikZaMetoduSortiranja").value;

	let max;
	let privremen;
	const n = tablicaTijeloSadrzaj.length;

	const redoviNiz = [];
	const poljaNiz = [];

	for (let i = 0; i < n; i++) {
		redoviNiz[i] = tablicaTijeloSadrzaj[i];
		poljaNiz[i] = odabranaPolja[i];
	}

	for (let indexI = 0; indexI < n; indexI++) {
		max = indexI;

		for (let indexJ = indexI + 1; indexJ < n; indexJ++) {
			const privElementMax = poljaNiz[max].innerHTML.toLowerCase();
			const privMax = isNaN(parseFloat(privElementMax)) ? privElementMax : parseFloat(privElementMax);

			const privElement = poljaNiz[indexJ].innerHTML.toLowerCase();
			const priv = isNaN(parseFloat(privElement)) ? privElement : parseFloat(privElement);

			if (metodaSortiranja === "silazno") {
				if (priv > privMax) {
					max = indexJ;
				}
			} else {
				if (priv < privMax) {
					max = indexJ;
				}
			}
		}

		privremen = redoviNiz[indexI];
		redoviNiz[indexI] = redoviNiz[max];
		redoviNiz[max] = privremen;

		const privremenoPolje = poljaNiz[indexI];
		poljaNiz[indexI] = poljaNiz[max];
		poljaNiz[max] = privremenoPolje;
	}

	tablicaTijelo.innerHTML = "";

	for (let i = 0; i < n; i++) {
		tablicaTijelo.innerHTML += redoviNiz[i].outerHTML;
	}
}

//funkcije za lakse upravljanje klasama elemenata

function imaCssKlasu(element, klasa) {
	const listaKlasa = element.className.split(" ");

	for (const k of listaKlasa) {
		if (k === klasa) {
			return true;
		}
	}

	return false;
}

function dodajCssKlasu(element, klasa) {
	if (imaCssKlasu(element, klasa) === false) {
		if (element.className === "") {
			element.className += klasa;
		} else {
			element.className += " " + klasa;
		}
	}
}

function odmakniCssKlasu(element, klasa) {
	const listaKlasa = element.className.split(" ");
	const novaListaKlasa = [];

	for (const k of listaKlasa) {
		if (k !== klasa && k !== "") {
			novaListaKlasa.push(k);
		}
	}

	element.className = novaListaKlasa.join(" ");
}
