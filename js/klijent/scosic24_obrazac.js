window.addEventListener("load", function () {
	document.getElementById("unosEmail").addEventListener("change", provjeriIspravnostEmaila);
	document.getElementById("odabirObavijesti").addEventListener("change", provjeriIspravnostEmaila);
	document.getElementById("unosDanasnjegDatuma").addEventListener("change", provjeriSmislenostDatuma);
	document.getElementById("unosDatumaDogadaja").addEventListener("change", provjeriSmislenostDatuma);

	document.querySelector("form").addEventListener("submit", function (e) {
		resetirajStaticneElementeGresaka();

		const ispravnostImena = provjeriPostojanostImena();
		const ispravnostEmaila = provjeriIspravnostEmaila();
		const ispravnostLozinke = provjeriIspravnostLozinke();
		const ispravnostDatuma = provjeriSmislenostDatuma();
		const ispravnostPoruke = provjeriPostojanjeNaslovaPoruke();
		const ispravnostDatoteke = provjeriFormatDatoteke();

		if (
			!(
				ispravnostImena &&
				ispravnostEmaila &&
				ispravnostLozinke &&
				ispravnostDatuma &&
				ispravnostPoruke &&
				ispravnostDatoteke
			)
		) {
			e.preventDefault();
			window.scrollTo(0, 0);
		}
	});
});

function provjeriPostojanostImena() {
	const unosIme = document.getElementById("unosIme");

	if (unosIme.value.length === 0) {
		unosIme.classList.add("greskaValidacije");
		document.getElementById("porukaGreskeIme").innerHTML = "<br>Polje 'Ime' je obavezno i ne smije biti prazno!<br>";
		return false;
	}
	return true;
}

function provjeriIspravnostLozinke() {
	const unosLozinka = document.getElementById("unosLozinka");

	if (unosLozinka.value.length < 10) {
		unosLozinka.classList.add("greskaValidacije");
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
			unosEmail.classList.add("greskaValidacije");
			porukaGreske.innerHTML = "<br>Polje 'E-mail' je obavezno ako želite dobivati obavijesti na e-mail!<br>";
			return false;
		}

		if (!regularniIzrazZaEmail.test(unosEmail.value)) {
			unosEmail.classList.add("greskaValidacije");
			porukaGreske.innerHTML =
				"<br>E-mail adresa mora biti u ispravnom formatu (npr. netko1@mail.com ili netko1.netko1@mail.com)<br>!";
			return false;
		}
	}

	porukaGreske.innerHTML = "";
	unosEmail.classList.remove("greskaValidacije");
	return true;
}

function provjeriSmislenostDatuma() {
	const unosDanasnjegDatuma = document.getElementById("unosDanasnjegDatuma");
	const unosDatumaDogadaja = document.getElementById("unosDatumaDogadaja");
	const porukaGreske = document.getElementById("porukaGreskeDatuma");

	if (unosDanasnjegDatuma.value < unosDatumaDogadaja.value) {
		unosDanasnjegDatuma.classList.add("greskaValidacije");
		unosDatumaDogadaja.classList.add("greskaValidacije");
		porukaGreske.innerHTML = "<br>Datum incidenta/događaja ne može biti nakon današnjeg datuma!<br>";
		return false;
	}

	unosDanasnjegDatuma.classList.remove("greskaValidacije");
	unosDatumaDogadaja.classList.remove("greskaValidacije");
	porukaGreske.innerHTML = "";
	return true;
}

function provjeriPostojanjeNaslovaPoruke() {
	const unosNaslovPoruke = document.getElementById("unosNaslovPoruke");
	const unosSadrzajPoruke = document.getElementById("unosSadrzajPoruke");

	if (unosSadrzajPoruke.value.length > 0 && unosNaslovPoruke.value.length === 0) {
		unosNaslovPoruke.classList.add("greskaValidacije");
		document.getElementById("porukaGreskeNaslovPoruke").innerHTML =
			"<br>Polje 'Naslov poruke' je obavezno ako šaljete sadržaj poruke!<br>";
		return false;
	}
	return true;
}

function provjeriFormatDatoteke() {
	const unosDatoteke = document.getElementById("unosDatoteke");

	if (unosDatoteke.files.length !== 0) {
		const datoteka = unosDatoteke.files[0].name.toLowerCase();
		const ekstenzijaDatoteke = datoteka.substring(datoteka.lastIndexOf("."));

		if (ekstenzijaDatoteke !== ".pdf" && ekstenzijaDatoteke !== ".jpg") {
			unosDatoteke.classList.add("greskaValidacije");
			document.getElementById("porukaGreskeDatoteke").innerHTML =
				"<br>Jedine datoteke koje se smiju slati su PDF dokumenti ili JPG slike!<br>";
			return false;
		}
	}
	return true;
}

function resetirajStaticneElementeGresaka() {
	document.getElementById("porukaGreskeIme").innerHTML = "";
	document.getElementById("unosIme").classList.remove("greskaValidacije");

	document.getElementById("porukaGreskeLozinka").innerHTML = "";
	document.getElementById("unosLozinka").classList.remove("greskaValidacije");

	document.getElementById("porukaGreskeNaslovPoruke").innerHTML = "";
	document.getElementById("unosNaslovPoruke").classList.remove("greskaValidacije");

	document.getElementById("porukaGreskeDatoteke").innerHTML = "";
	document.getElementById("unosDatoteke").classList.remove("greskaValidacije");
}
