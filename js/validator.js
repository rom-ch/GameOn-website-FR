// DOM elements
const form = document.getElementById("form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const city = document.querySelector("#location1");
const useConditions = document.getElementById("checkbox1");
const newsletter = document.getElementById("checkbox2");

// messages d'erreur
const errorMsg = {
	firstName: "Le prénom doit comporter au moins 2 caractères",
	lastName: "Le nom doit comporter au moins 2 caractères",
	email: "L'adresse email n'est pas valide",
	birthdate: "La date de naissance n'est pas valide",
	quantity: "Veuillez entrer un nombre entre 0 et 9999",
	city: "Veuillez selectionner une ville",
	useConditions: "Veuillez accepter les conditions d'utilisation",
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
	const regEx = new RegExp(/^[a-zA-Z-_]{2,}$/);

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

	if (!regEx.test(birthdate.value)) {
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
		quantity === "" ||
		quantity < 0 ||
		quantity > 9999
	) {
		showErrorMessage(quantity, message);
		return false;
	} else {
		clearErrorMessage(quantity);
		return true;
	}
}
// check cities
function cityCheck(message) {
	let checkedCity = document.querySelector("input[name='location']:checked");

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
		console.log("good");
	} else {
		console.log("bad");
	}
}

form.addEventListener("submit", e => {
	e.preventDefault();
	formValidation();
});

// validation on submit ou event listeners
//  click on backdrop: remove modal
// ajouter modal confirmation
// dernier input
// background-img CSS:17
