window.addEventListener("load", function () {
	document.getElementById("tipkaZaMobilniIzbornik").addEventListener("click", promjeniIzbornik);

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
		document.getElementById("unosZaPretrazivanje").addEventListener("change", iniciranjeInteraktivneTablice);
	}

	if (padajuciIzbornikZaOdabraniStupac && padajuciIzbornikZaMetoduSortiranja && unosZaPretrazivanje) {
		iniciranjeInteraktivneTablice();
	}
});

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
			navigacijskaVeza.classList.add("aktivnaStranica");
			break;
		}
	}
}

function promjeniIzbornik() {
	const navigacijskaTraka = document.querySelector("nav ul");

	if (navigacijskaTraka.classList.contains("otvorenNavigacijskiIzbornik")) {
		navigacijskaTraka.classList.remove("otvorenNavigacijskiIzbornik");
	} else {
		navigacijskaTraka.classList.add("otvorenNavigacijskiIzbornik");
	}
}

function iniciranjeInteraktivneTablice() {
	const odabraniStupac = document.getElementById("padajuciIzbornikZaOdabraniStupac").value;
	const odabranaPolja = document.querySelectorAll("table td:nth-child(" + odabraniStupac + ")");

	pretraziTablicu(odabraniStupac, odabranaPolja);
	sortirajTablicu(odabraniStupac, odabranaPolja);
}

function pretraziTablicu(odabraniStupac, odabranaPolja) {
	const kljucPretrage = document.getElementById("unosZaPretrazivanje").value.toLowerCase();

	let brojacNevidljivihRedaka = 0;

	for (const polje of odabranaPolja) {
		if (polje.innerHTML.toLowerCase().indexOf(kljucPretrage) === -1) {
			polje.parentElement.classList.add("nevidljiRedak");
			brojacNevidljivihRedaka++;
		} else {
			polje.parentElement.classList.remove("nevidljiRedak");
		}
	}

	const izjavaNemaRezultata = document.querySelector(".izjavaNemaRezultata");

	if (brojacNevidljivihRedaka === odabranaPolja.length) {
		izjavaNemaRezultata.classList.add("vidljivaIzjavaRezultata");
	} else {
		izjavaNemaRezultata.classList.remove("vidljivaIzjavaRezultata");
	}
}

function sortirajTablicu(odabraniStupac, odabranaPolja) {
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
		tablicaTijelo.innerHTML += "<tr>" + redoviNiz[i].innerHTML + "</tr>";
	}
}
