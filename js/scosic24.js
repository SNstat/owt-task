document.addEventListener("DOMContentLoaded", () => {
	PostavljanjeAktivneStranice();

	document.getElementById("tipkaZaMobilniIzbornik").addEventListener("click", PromjeniIzbornik);
});

function PostavljanjeAktivneStranice() {
	const aktivnaStranica = document.URL.substring(document.URL.lastIndexOf("/") + 1);

	console.log(aktivnaStranica);

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
