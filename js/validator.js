// DOM elements
const form = document.getElementById("form");
const modalBody = document.querySelector(".modal-body");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const city = document.querySelector("#location1");
const useConditions = document.getElementById("checkbox1");

// messages d'erreur
const errorMsg = {
	firstName: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
	lastName: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
	email: "L'adresse email n'est pas valide",
	birthdate: "Vous devez entrer votre date de naissance.",
	quantity: "Veuillez entrer un nombre entre 0 et 99",
	city: "Vous devez choisir une option.",
	useConditions:
		"Vous devez vérifier que vous acceptez les termes et conditions.",
};

// afficher ou enlever messages d'erreur
function clearErrorMessage(element) {
	element.closest(".formData").setAttribute("data-error-visible", "false");
	element.closest(".formData").setAttribute("data-error", "");
}

function showErrorMessage(element, message) {
	element.closest(".formData").setAttribute("data-error-visible", "true");
	element.closest(".formData").setAttribute("data-error", message);
}

// check nom et prenom
function nameCheck(element, message) {
	const regEx = new RegExp(/^[a-zA-Z -_]{2,}$/);

	if (!regEx.test(element.value) || element === "") {
		showErrorMessage(element, message);
		return false;
	} else {
		clearErrorMessage(element);
		return true;
	}
}

// check email
function emailCheck(email, message) {
	const regEx = new RegExp(
		/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,6}$/
	);

	if (!regEx.test(email.value) || email === "") {
		showErrorMessage(email, message);
		return false;
	} else {
		clearErrorMessage(email);
		return true;
	}
}

// check date de naissance
function birthdateCheck(birthdate, message) {
	const regEx = new RegExp(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
	const currentDate = new Date().getTime();
	const enteredDate = new Date(birthdate.value).getTime();

	if (!regEx.test(birthdate.value) || enteredDate > currentDate) {
		showErrorMessage(birthdate, message);
		return false;
	} else {
		clearErrorMessage(birthdate);
		return true;
	}
}

// check quantity
function quantityCheck(quantity, message) {
	const regEx = new RegExp(/\d/);

	if (
		!regEx.test(quantity.value) ||
		quantity.value === "" ||
		quantity.value < 0 ||
		quantity.value > 99
	) {
		console.log(quantity);
		showErrorMessage(quantity, message);
		return false;
	} else {
		clearErrorMessage(quantity);
		return true;
	}
}
// check cities
function cityCheck(message) {
	const checkedCity = document.querySelector(
		"input[name='location']:checked"
	);

	if (!checkedCity) {
		showErrorMessage(city, message);
		return false;
	} else {
		clearErrorMessage(city);
		return true;
	}
}

// check conditions d'utilisations
function useConditionsCheck(useConditions, message) {
	if (!useConditions.checked) {
		showErrorMessage(useConditions, message);
		return false;
	} else {
		clearErrorMessage(useConditions);
		return true;
	}
}

// Listeners on blur
firstName.addEventListener("blur", () => {
	nameCheck(firstName, errorMsg.firstName);
});

lastName.addEventListener("blur", () => {
	nameCheck(lastName, errorMsg.lastName);
});

email.addEventListener("blur", () => {
	emailCheck(email, errorMsg.email);
});

birthdate.addEventListener("blur", () => {
	birthdateCheck(birthdate, errorMsg.birthdate);
});

quantity.addEventListener("blur", () => {
	quantityCheck(quantity, errorMsg.quantity);
});

document.getElementById("cities").addEventListener("click", () => {
	cityCheck(errorMsg.city);
});

// form validation
function formValidation() {
	const firstNameVal = nameCheck(firstName, errorMsg.firstName);
	const lastNameVal = nameCheck(lastName, errorMsg.lastName);
	const emailVal = emailCheck(email, errorMsg.email);
	const birthdateVal = birthdateCheck(birthdate, errorMsg.birthdate);
	const quantityVal = quantityCheck(quantity, errorMsg.quantity);
	const cityVal = cityCheck(errorMsg.city);
	const useConditionsVal = useConditionsCheck(
		useConditions,
		errorMsg.useConditions
	);

	if (
		firstNameVal &&
		lastNameVal &&
		emailVal &&
		birthdateVal &&
		quantityVal &&
		cityVal &&
		useConditionsVal
	) {
		return true;
	} else {
		return false;
	}
}

const html = `
	<div class="confirmation">
		<h2>Merci ! Votre réservation a été reçue.</h2>
		<button class="btn-submit" id="close-modal">Fermer</button>
	</div>
`;

// confirmation modal
function showConfirmation() {
	const formVal = formValidation();

	if (formVal) {
		form.style.display = "none";
		modalBody.insertAdjacentHTML("beforeend", html);
		console.log(formVal);
	}
}

form.addEventListener("submit", e => {
	e.preventDefault();
	showConfirmation();
});

// reset form
function reset() {
	const checkedCity = document.querySelector(
		"input[name='location']:checked"
	);

	firstName.value = "";
	lastName.value = "";
	email.value = "";
	birthdate.value = "";
	quantity.value = "";
	if (document.querySelector("input[name='location']:checked")) {
		checkedCity.checked = false;
	}
}

// close confirmation modal
document.addEventListener("click", e => {
	const modalbg = document.querySelector(".bground");
	const target = e.target.closest("#close-modal");

	if (target) {
		reset();
		modalbg.style.display = "none";
		form.style.display = "block";
		document.querySelector(".confirmation").style.display = "none";
	}
});
