document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("tipkaZaMobilniIzbornik").addEventListener("click", PromjeniIzbornik);

	PostavljanjeAktivneStranice();

	if (document.getElementById("padajuciIzbornikZaOdabraniStupac")) {
		document
			.getElementById("padajuciIzbornikZaOdabraniStupac")
			.addEventListener("change", IniciranjeInteraktivneTablice);
	}

	if (document.getElementById("padajuciIzbornikZaMetoduSortiranja")) {
		document
			.getElementById("padajuciIzbornikZaMetoduSortiranja")
			.addEventListener("change", IniciranjeInteraktivneTablice);
	}

	if (document.getElementById("unosZaPretrazivanje")) {
		document.getElementById("unosZaPretrazivanje").addEventListener("change", IniciranjeInteraktivneTablice);
	}
});

function PostavljanjeAktivneStranice() {
	const aktivnaStranica = document.URL.substring(document.URL.lastIndexOf("/") + 1);

	const navigacijskeVeze = document.querySelectorAll("nav a");

	for (let navigacijskaVeza of navigacijskeVeze) {
		if (aktivnaStranica === navigacijskaVeza.getAttribute("href")) {
			navigacijskaVeza.classList.add("aktivnaStranica");
		}
	}
}

function PromjeniIzbornik() {
	let navigacijskaTraka = document.querySelector("nav ul");

	if (navigacijskaTraka.classList.contains("otvorenNavigacijskiIzbornik")) {
		navigacijskaTraka.classList.remove("otvorenNavigacijskiIzbornik");
	} else {
		navigacijskaTraka.classList.add("otvorenNavigacijskiIzbornik");
	}
}

function IniciranjeInteraktivneTablice() {
	let odabraniStupac = document.getElementById("padajuciIzbornikZaOdabraniStupac").value;
	let odabranaPolja = document.querySelectorAll("table td:nth-child(" + odabraniStupac + ")");

	PretraziTablicu(odabraniStupac, odabranaPolja);
	SortirajTablicu(odabraniStupac, odabranaPolja);
}

function PretraziTablicu(odabraniStupac, odabranaPolja) {
	let kljucPretrage = document.getElementById("unosZaPretrazivanje").value.toLowerCase();

	let brojacNevidljivihRedaka = 0;

	for (let polje of odabranaPolja) {
		if (polje.innerHTML.toLowerCase().indexOf(kljucPretrage) == -1) {
			polje.parentElement.classList.add("nevidljiRedak");
			brojacNevidljivihRedaka++;
		} else {
			polje.parentElement.classList.remove("nevidljiRedak");
		}
	}

	let izjavaNemaRezultata = document.querySelector(".izjavaNemaRezultata");

	if (brojacNevidljivihRedaka == odabranaPolja.length) {
		izjavaNemaRezultata.classList.add("vidljivaIzjavaRezultata");
	} else {
		izjavaNemaRezultata.classList.remove("vidljivaIzjavaRezultata");
	}
}

function SortirajTablicu(odabraniStupac, odabranaPolja) {
	let tablicaTijelo = document.querySelector("table tbody");
	let tablicaTijeloSadrzaj = document.querySelectorAll("table tbody tr");

	const metodaSortiranja = document.getElementById("padajuciIzbornikZaMetoduSortiranja").value;

	let max = 0;
	let privremen;
	let n = tablicaTijeloSadrzaj.length;

	let redoviNiz = [];
	let poljaNiz = [];

	for (let i = 0; i < n; i++) {
		redoviNiz.push(tablicaTijeloSadrzaj[i]);
		poljaNiz.push(odabranaPolja[i]);
	}

	for (let indexI = 0; indexI < n; indexI++) {
		max = indexI;

		for (let indexJ = indexI + 1; indexJ < n; indexJ++) {
			let privElementMax = poljaNiz[max].innerHTML.toLowerCase();
			let privMax = isNaN(parseFloat(privElementMax)) ? privElementMax : parseFloat(privElementMax);

			let privElement = poljaNiz[indexJ].innerHTML.toLowerCase();
			let priv = isNaN(parseFloat(privElement)) ? privElement : parseFloat(privElement);

			if (metodaSortiranja == "silazno") {
				if (priv > privMax) {
					max = indexJ;
				}
			} else {
				if (priv <= privMax) {
					max = indexJ;
				}
			}
		}

		privremen = redoviNiz[indexI];
		redoviNiz[indexI] = redoviNiz[max];
		redoviNiz[max] = privremen;

		let privremenoPolje = poljaNiz[indexI];
		poljaNiz[indexI] = poljaNiz[max];
		poljaNiz[max] = privremenoPolje;
	}

	tablicaTijelo.innerHTML = "";
	for (let i = 0; i < n; i++) {
		tablicaTijelo.appendChild(redoviNiz[i]);
	}
}
