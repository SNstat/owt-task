window.addEventListener("load", function () {
	document.getElementById("unosDatumaDogadaja").value = dohvatiDanasnjiDatum();

	document.getElementById("unosEmail").addEventListener("input", provjeriIspravnostEmaila);
	document.getElementById("odabirObavijesti").addEventListener("change", provjeriIspravnostEmaila);
	document.getElementById("unosDatumaDogadaja").addEventListener("change", provjeriSmislenostDatuma);
	document.getElementById("unosNaslovPoruke").addEventListener("input", provjeriPostojanjeNaslovaPoruke);
	document.getElementById("unosRazlogPoruke").addEventListener("change", provjeriSadrzajZaReklamaciju);

	document.getElementById("unosDatumaDogadaja").addEventListener("keydown", function (e) {
		e.preventDefault();
	});

	document.getElementById("unosSadrzajPoruke").addEventListener("input", function () {
		provjeriPostojanjeNaslovaPoruke();
		provjeriSadrzajZaReklamaciju();
	});

	document.getElementById("obrazacZaKontakt").addEventListener("submit", function (e) {
		resetirajStaticneElementeGresaka();

		const ispravnostImena = provjeriPostojanostImena();
		const ispravnostEmaila = provjeriIspravnostEmaila();
		const ispravnostLozinke = provjeriIspravnostLozinke();
		const ispravnostDatuma = provjeriSmislenostDatuma();
		const ispravnostPoruke = provjeriPostojanjeNaslovaPoruke();
		const ispravnostDatoteke = provjeriFormatDatoteke();
		const ispravnostSadrzaja = provjeriSadrzajZaReklamaciju();

		if (
			!(
				ispravnostImena &&
				ispravnostEmaila &&
				ispravnostLozinke &&
				ispravnostDatuma &&
				ispravnostPoruke &&
				ispravnostDatoteke &&
				ispravnostSadrzaja
			)
		) {
			e.preventDefault();
			window.scrollTo(0, 0);
		}
	});
});

function dohvatiDanasnjiDatum() {
	const danasnjiDatum = new Date();

	let mjesec = (danasnjiDatum.getMonth() + 1).toString();
	mjesec = mjesec.length === 1 ? "0" + mjesec : mjesec;

	let dan = danasnjiDatum.getDate().toString();
	dan = dan.length === 1 ? "0" + dan : dan;

	return danasnjiDatum.getFullYear() + "-" + mjesec + "-" + dan;
}

function provjeriPostojanostImena() {
	const unosIme = document.getElementById("unosIme");

	if (unosIme.value.length === 0) {
		dodajCssKlasu(unosIme, "greskaValidacije");
		document.getElementById("porukaGreskeIme").innerHTML = "<br>Polje 'Ime' je obavezno i ne smije biti prazno!<br>";
		return false;
	}
	return true;
}

function provjeriIspravnostLozinke() {
	const unosLozinka = document.getElementById("unosLozinka");

	if (unosLozinka.value.length < 10) {
		dodajCssKlasu(unosLozinka, "greskaValidacije");
		document.getElementById("porukaGreskeLozinka").innerHTML =
			"<br>Polje 'Lozinka' je obavezno i mora sadržavati barem 10 znakova!<br>";
		return false;
	}
	return true;
}

function provjeriIspravnostEmaila() {
	const unosEmail = document.getElementById("unosEmail");
	const regularniIzrazZaEmail = RegExp(/^[a-z0-9]+(\.[a-z0-9]+)*@[a-z0-9]+\.[a-z0-9]+(\.[a-z0-9]+)*$/);
	const porukaGreske = document.getElementById("porukaGreskeEmail");
	const odabirObavijesti = document.getElementById("odabirObavijesti");

	if (odabirObavijesti.checked) {
		if (unosEmail.value === "") {
			window.scrollTo(0, 0);
			dodajCssKlasu(unosEmail, "greskaValidacije");
			porukaGreske.innerHTML = "<br>Polje 'E-mail' je obavezno ako želite dobivati obavijesti na e-mail!<br>";
			return false;
		}

		if (!regularniIzrazZaEmail.test(unosEmail.value)) {
			dodajCssKlasu(unosEmail, "greskaValidacije");
			porukaGreske.innerHTML =
				"<br>E-mail adresa mora biti u ispravnom formatu (npr. netko1@mail.com ili netko1.netko1@mail.com)<br>!";
			return false;
		}
	}

	porukaGreske.innerHTML = "";
	odmakniCssKlasu(unosEmail, "greskaValidacije");
	return true;
}

function provjeriSmislenostDatuma() {
	const unosDatumaDogadaja = document.getElementById("unosDatumaDogadaja");
	const porukaGreske = document.getElementById("porukaGreskeDatuma");

	if (unosDatumaDogadaja.value > dohvatiDanasnjiDatum()) {
		dodajCssKlasu(unosDatumaDogadaja, "greskaValidacije");
		porukaGreske.innerHTML = "<br>Datum incidenta/događaja ne može biti nakon današnjeg datuma!<br>";
		return false;
	}

	odmakniCssKlasu(unosDatumaDogadaja, "greskaValidacije");
	porukaGreske.innerHTML = "";
	return true;
}

function provjeriSadrzajZaReklamaciju() {
	const unosRazlogPoruke = document.getElementById("unosRazlogPoruke");
	const unosSadrzajPoruke = document.getElementById("unosSadrzajPoruke");
	const porukaGreske = document.getElementById("porukaGreskeSadrzaja");

	if (unosRazlogPoruke.value === "Reklamacija" && unosSadrzajPoruke.value === "") {
		dodajCssKlasu(unosSadrzajPoruke, "greskaValidacije");
		porukaGreske.innerHTML = "<br>Polje 'Sadrzaj poruke' je obavezno ako želite slati reklamaciju!<br>";
		return false;
	}

	odmakniCssKlasu(unosSadrzajPoruke, "greskaValidacije");
	porukaGreske.innerHTML = "";

	return true;
}

function provjeriPostojanjeNaslovaPoruke() {
	const unosNaslovPoruke = document.getElementById("unosNaslovPoruke");
	const unosSadrzajPoruke = document.getElementById("unosSadrzajPoruke");
	const porukaGreske = document.getElementById("porukaGreskeNaslovPoruke");

	if (unosSadrzajPoruke.value.length > 0 && unosNaslovPoruke.value.length === 0) {
		dodajCssKlasu(unosNaslovPoruke, "greskaValidacije");
		porukaGreske.innerHTML = "<br>Polje 'Naslov poruke' je obavezno ako šaljete sadržaj poruke!<br>";
		return false;
	}

	odmakniCssKlasu(unosNaslovPoruke, "greskaValidacije");
	porukaGreske.innerHTML = "";

	return true;
}

function provjeriFormatDatoteke() {
	const unosDatoteke = document.getElementById("unosDatoteke");

	if (unosDatoteke.files.length !== 0) {
		const datoteka = unosDatoteke.files[0].name.toLowerCase();
		const ekstenzijaDatoteke = datoteka.substring(datoteka.lastIndexOf("."));

		if (ekstenzijaDatoteke !== ".pdf" && ekstenzijaDatoteke !== ".jpg") {
			dodajCssKlasu(unosDatoteke, "greskaValidacije");
			document.getElementById("porukaGreskeDatoteke").innerHTML =
				"<br>Jedine datoteke koje se smiju slati su PDF dokumenti ili JPG slike!<br>";
			return false;
		}
	}
	return true;
}

function resetirajStaticneElementeGresaka() {
	document.getElementById("porukaGreskeIme").innerHTML = "";
	odmakniCssKlasu(document.getElementById("unosIme"), "greskaValidacije");

	document.getElementById("porukaGreskeLozinka").innerHTML = "";
	odmakniCssKlasu(document.getElementById("unosLozinka"), "greskaValidacije");

	document.getElementById("porukaGreskeNaslovPoruke").innerHTML = "";
	odmakniCssKlasu(document.getElementById("unosNaslovPoruke"), "greskaValidacije");

	document.getElementById("porukaGreskeDatoteke").innerHTML = "";
	odmakniCssKlasu(document.getElementById("unosDatoteke"), "greskaValidacije");
}

//funkcije za jednostavnije upravljanje klasama elemenata

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
