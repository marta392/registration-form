<template>
	<div class="form-container">
		<h2>Corsi StarTech!</h2>
		<form @submit.prevent="submitForm">
			<div class="input-box">
				<input type="text" id="firstName" placeholder="Nome" v-model="formData.firstName" required
					@blur="validateFirstName" />
				<div class="underline"></div>
				<p v-if="firstNameError" class="error-message">{{ firstNameError }}</p>
			</div>
			<div class="input-box">
				<input type="text" id="lastName" placeholder="Cognome" v-model="formData.lastName" required
					@blur="validateLastName" />
				<div class="underline"></div>
				<p v-if="lastNameError" class="error-message">{{ lastNameError }}</p>
			</div>
			<div class="input-box">
				<input type="tel" id="phone" v-model="formData.phone" required @blur="validatePhone"
					placeholder="Telefono" />
				<div class="underline"></div>
				<p v-if="phoneError" class="error-message">{{ phoneError }}</p>
			</div>
			<div class="input-box">
				<input type="email" id="email" v-model="formData.email" required @blur="validateEmail"
					placeholder="Email" />
				<div class="underline"></div>
				<p v-if="emailError" class="error-message">{{ emailError }}</p>
			</div>
			<div class="checkbox-container">
				<p class="checkbox-label">Corso di interesse</p>
				<div class="checkbox-group">
					<div v-for="course in courses" :key="course" class="checkbox-list">
						<input type="checkbox" :id="course" :value="course" v-model="formData.selectedCourses" />
						<label :for="course">{{ course }}</label>
					</div>
				</div>
				<p v-if="selectedCoursesError" class="error-message">{{ selectedCoursesError }}</p>
			</div>
			<div class="button-container">
				<button class="button-form" type="submit">Registrati</button>
			</div>
		</form>
	</div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';

export default {
	setup() {
		const router = useRouter();
		const formData = ref({
			firstName: "",
			lastName: "",
			phone: "",
			email: "",
			selectedCourses: []
		});

		const courses = ref(["React", "VueJS", "NodeJS", "MongoDB"]);

		const firstNameError = ref("");
		const lastNameError = ref("");
		const emailError = ref("");
		const phoneError = ref("");
		const selectedCoursesError = ref("");


		// Controllo campo nome
		const validateFirstName = () => {
			if (!formData.value.firstName) {
				firstNameError.value = "Campo obbligatorio.";
			} else {
				firstNameError.value = "";
			}
		};

		// Controllo campo cognome
		const validateLastName = () => {
			if (!formData.value.lastName) {
				lastNameError.value = "Campo obbligatorio.";
			} else {
				lastNameError.value = "";
			}
		};

		// Controllo campo telefono
		const validatePhone = () => {
			const phonePattern = /^[0-9]*$/;
			if (!formData.value.phone) {
				phoneError.value = "Campo obbligatorio.";
			}
			else if (!phonePattern.test(formData.value.phone)) {
				formData.value.phone = formData.value.phone.replace(/[^0-9]/g, "");
			}
			else {
				phoneError.value = "";
			}
		};

		// Controllo campo email
		const validateEmail = () => {
			const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			// Verifica se l'email è vuota
			if (!formData.value.email) {
				emailError.value = "Campo obbligatorio.";
			}
			// Verifica se l'email non corrisponde al pattern
			else if (!emailPattern.test(formData.value.email)) {
				emailError.value = "Inserisci un indirizzo email valido.";
			}
			// Se l'email è valida, resetta l'errore
			else {
				emailError.value = "";
			}
		};

		// Controllo selezione corsi
		const validateSelectedCourses = () => {
			if (formData.value.selectedCourses.length === 0) {
				selectedCoursesError.value = "Seleziona almeno un corso.";
			} else {
				selectedCoursesError.value = "";
			}
		};

		const submitForm = async () => {
			// Chiama le funzioni di validazione per verificare i campi del modulo 
			validateFirstName();
			validateLastName();
			validatePhone();
			validateEmail();
			validateSelectedCourses();

			// Verifica se ci sono errori
			if (!firstNameError.value && !lastNameError.value && !phoneError.value && !emailError.value && !selectedCoursesError.value) {
				try {
					const response = await fetch("http://localhost:3000/register", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(formData.value),
					});

					if (response.ok) {
						router.push({
							name: "success",
							params: { name: formData.value.firstName },
						});
					} else {
						alert("Errore nella registrazione, DUPLICATO!!!");
					}
				} catch (error) {
					console.error("Errore:", error);
					alert("Errore nella registrazione. Riprova.");
				}
			}
		};

		return {
			formData,
			courses,
			firstNameError,
			lastNameError,
			phoneError,
			emailError,
			selectedCoursesError,
			validateFirstName,
			validateLastName,
			validatePhone,
			validateEmail,
			validateSelectedCourses,
			submitForm
		};
	},
};
</script>

<style scoped>
.form-container {
	padding: 2em;
	background-color: #EEEEEE;
}

form {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
}

/* Typography */
.form-container h2 {
	font-size: 2em;
	font-weight: bold;
	color: #2e0249;
	margin: 0;
}

/* Input elements */
form .input-box {
	width: 100%;
	height: 40px;
	margin-top: 20px;
	position: relative;
}

form .input-box input {
	width: 100%;
	height: 100%;
	outline: none;
	border: none;
	color: #2e0249;
	background-color: #eeeeee;
	font-size: 15px;
	font-weight: 600;
}

form .underline::before {
	content: "";
	position: absolute;
	height: 2px;
	width: 100%;
	background: #ccc;
	left: 0;
	bottom: 0;
}

form .underline::after {
	content: "";
	position: absolute;
	height: 2px;
	width: 100%;
	background: #a91079;
	left: 0;
	bottom: 0;
	transform: scaleX(0);
	transform-origin: left;
	transition: all 0.3s ease;
}

form .input-box input:focus~.underline::after,
form .input-box input:valid~.underline::after {
	transform: scaleX(1);
	transform-origin: left;
}

/* Placeholder */
form .input-box input::placeholder,
form .checkbox-group {
	color: #707070;
	font-weight: 600;
}

/* Checkbox elements */
.checkbox-container {
	margin-top: 30px;
}

.checkbox-label {
	color: #2e0249;
	font-weight: 600;
	margin-bottom: 10px;
}

.checkbox-group {
	display: flex;
	flex-wrap: wrap;
}

.checkbox-group div {
	flex: 0 0 50%;
	display: flex;
	align-items: center;
	margin: 10px 0;
}

.checkbox-group label {
	margin-left: 8px;
	font-weight: 600;
}

input[type=checkbox]:checked+label {
	color: #2e0249;
	font-weight: 600;
}

/* Button */
.button-container {
	margin-top: auto;
	text-align: center;
	padding-top: 2em;
}

.button-form {
	border-radius: 20px;
	background-color: #a91079;
	color: #EEEEEE;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	cursor: pointer;
	border: none;
}

.button-form:hover {
	opacity: 0.7;
}

/* Errors */
.error-message {
	margin: 5px 0 5px 0;
	color: #F00404;
	font-size: 12px;
}

@media (min-width: 768px) {
	.form-container {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
}
</style>
