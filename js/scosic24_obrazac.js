let obrazac = document.getElementById("obrazacZaKontakt");
obrazac.addEventListener("submit", ProvjeriObrazac);

function ProvjeriObrazac(e) {
	if (
		!ProvjeriFormatDatoteke() ||
		!ProvjeriIspravnostEmail() ||
		!ProvjeriOdabirEmailObavijesti() ||
		!ProvjeriSmislenostDatuma()
	) {
		e.preventDefault();
	}
}

function ProvjeriPostojanostImena() {
	let unosIme = document.getElementById("unosIme");

	if (unosIme.value.length == 0) {
		unosIme.classList.add("greskaValidacije");
		return false;
	}

	return true;
}

function ProvjeriIspravnostEmail() {
	let unosEmail = document.getElementById("unosEmail");
	let regularniIzrazZaEmail = /[a-z0-9]+([._-][a-z0-9]+)*@[a-z0-9]+\.[a-z0-9]+(\.[a-z0-9]+)*/;

	if (regularniIzrazZaEmail.test(unosEmail.value)) {
		unosEmail.classList.add("greskaValidacije");
		return false;
	}
	return true;
}

function ProvjeriOdabirEmailObavijesti() {
	let odabirObavijesti = document.getElementById("odabirObavijesti");
	let unosEmail = document.getElementById("unosEmail");

	odabirObavijesti.classList.remove("greskaValidacije");
	unosEmail.classList.remove("greskaValidacije");

	if (odabirObavijesti.checked && unosEmail.value === "") {
		odabirObavijesti.classList.add("greskaValidacije");
		unosEmail.classList.add("greskaValidacije");
		unosEmail.setCustomValidity("Email mora biti unesen ako želite primati obavijesti!");
		return false;
	}
	unosEmail.setCustomValidity("");
	return true;
}

function ProvjeriSmislenostDatuma() {
	let unosDanasnjegDatuma = document.getElementById("unosDanasnjegDatuma");
	let unosDatumaDogadaja = document.getElementById("unosDatumaDogadaja");

	unosDanasnjegDatuma.classList.remove("greskaValidacije");
	unosDatumaDogadaja.classList.remove("greskaValidacije");

	if (unosDanasnjegDatuma.value > unosDatumaDogadaja.value) {
		dogadaj.classList.add("greskaValidacije");
		return false;
	}
	return true;
}

function ProvjeriFormatDatoteke() {
	let unosDatoteke = document.getElementById("unosDatoteke");
	unosDatoteke.classList.remove("greskaValidacije");
	let datoteka = unosDatoteke.files[0].name.toLowerCase();

	if (datoteka != null && !datoteka.endsWith(".pdf")) {
		unosDatoteke.classList.add("greskaValidacije");
		return false;
	}
	return true;
}
