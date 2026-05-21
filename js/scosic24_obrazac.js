document.querySelector("form").addEventListener("submit", function (e) {
	ResetirajStaticneElementeGresaka();

	let ispravnostImena = ProvjeriPostojanostImena();
	let ispravnostEmaila = ProvjeriIspravnostEmaila();
	let ispravnostLozinke = ProvjeriIspravnostLozinke();
	let ispravnostDatuma = ProvjeriSmislenostDatuma();
	let ispravnostPoruke = ProvjeriPostojanjeNaslovaPoruke();
	let ispravnostDatoteke = ProvjeriFormatDatoteke();

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
		alert("Postoje neispravna polja u obrascu, provjerite uvjete!");
	}
});

function ProvjeriPostojanostImena() {
	let unosIme = document.getElementById("unosIme");

	if (unosIme.value.length == 0) {
		unosIme.classList.add("greskaValidacije");
		document.getElementById("porukaGreskeIme").innerHTML = "<br>Polje 'Ime' je obavezno i ne smije biti prazno!<br>";
		return false;
	}
	return true;
}

function ProvjeriIspravnostLozinke() {
	let unosLozinka = document.getElementById("unosLozinka");

	if (unosLozinka.value.length < 10) {
		unosLozinka.classList.add("greskaValidacije");
		document.getElementById("porukaGreskeLozinka").innerHTML =
			"<br>Polje 'Lozinka' je obavezno i mora sadržavati barem 10 znakova!<br>";
		return false;
	}
	return true;
}

function ProvjeriIspravnostEmaila() {
	let unosEmail = document.getElementById("unosEmail");
	let regularniIzrazZaEmail = /[a-z0-9]+([._-][a-z0-9]+)*@[a-z0-9]+\.[a-z0-9]+(\.[a-z0-9]+)*/;
	let porukaGreske = document.getElementById("porukaGreskeEmail");

	if (odabirObavijesti.checked) {
		if (unosEmail.value == "") {
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

function ProvjeriSmislenostDatuma() {
	let unosDanasnjegDatuma = document.getElementById("unosDanasnjegDatuma");
	let unosDatumaDogadaja = document.getElementById("unosDatumaDogadaja");
	let porukaGreske = document.getElementById("porukaGreskeDatuma");

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

function ProvjeriPostojanjeNaslovaPoruke() {
	let unosNaslovPoruke = document.getElementById("unosNaslovPoruke");
	let unosSadrzajPoruke = document.getElementById("unosSadrzajPoruke");

	if (unosSadrzajPoruke.value.length > 0 && unosNaslovPoruke.value.length == 0) {
		unosNaslovPoruke.classList.add("greskaValidacije");
		document.getElementById("porukaGreskeNaslovProuke").innerHTML =
			"<br>Polje 'Naslov prouke' je obavezno ako šaljete sadržaj poruke!<br>";
		return false;
	}
	return true;
}

function ProvjeriFormatDatoteke() {
	let unosDatoteke = document.getElementById("unosDatoteke");

	if (unosDatoteke.files.length != 0) {
		let datoteka = unosDatoteke.files[0].name.toLowerCase();

		if (!datoteka.endsWith(".pdf") && !datoteka.endsWith(".jpg")) {
			unosDatoteke.classList.add("greskaValidacije");
			document.getElementById("porukaGreskeDatoteke").innerHTML =
				"<br>Jedine datoteke koje se smiju slati su PDF dokumenti ili JPG slike!<br>";
			return false;
		}
	}
	return true;
}

function ResetirajStaticneElementeGresaka() {
	document.getElementById("porukaGreskeIme").innerHTML = "";
	document.getElementById("unosIme").classList.remove("greskaValidacije");

	document.getElementById("porukaGreskeLozinka").innerHTML = "";
	document.getElementById("unosLozinka").classList.remove("greskaValidacije");

	document.getElementById("porukaGreskeNaslovProuke").innerHTML = "";
	document.getElementById("unosNaslovPoruke").classList.remove("greskaValidacije");

	document.getElementById("porukaGreskeDatoteke").innerHTML = "";
	document.getElementById("unosDatoteke").classList.remove("greskaValidacije");
}
