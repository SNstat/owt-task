document.addEventListener("DOMContentLoaded", PostavljanjeAktivneStranice);

function PostavljanjeAktivneStranice() {
	const aktivnaStranica = document.URL.split("/").pop();

	const navigacijskeVeze = document.querySelectorAll("nav a");

	navigacijskeVeze.forEach((navigacijskaVeza) => {
		if (aktivnaStranica === navigacijskaVeza.getAttribute("href")) {
			navigacijskaVeza.classList.add("aktivnaStranica");
		}
	});
}

function PromjeniIzbornik() {
	let navigacijskaTraka = document.querySelector("nav ul");

	if (navigacijskaTraka.classList.contains("otvorenNavigacijskiIzbornik")) {
		navigacijskaTraka.classList.remove("otvorenNavigacijskiIzbornik");
	} else {
		navigacijskaTraka.classList.add("otvorenNavigacijskiIzbornik");
	}
}
