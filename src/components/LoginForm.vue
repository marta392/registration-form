<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="submitLoginForm">
            <div class="input-box">
                <input type="text" id="username" v-model="username" placeholder="Username" @input="validateUsername" />
                <div class="underline"></div>
                <p v-if="usernameError" class="error-message">{{ usernameError }}</p>
            </div>
            <div class="input-box">
                <input type="password" id="password" v-model="password" placeholder="Password"
                    @input="validatePassword" />
                <div class="underline"></div>
                <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
            </div>
            <div class="button-container">
                <p v-if="loginError" class="error-message">{{ loginError }}</p>
                <button class="button-form" type="submit">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const username = ref('');
        const password = ref('');

        const usernameError = ref('');
        const passwordError = ref('');
        const loginError = ref('');

        const validateUsername = () => {
            if (!username.value) {
                usernameError.value = "Campo obbligatorio.";
            } else {
                usernameError.value = "";
            }
        };

        const validatePassword = () => {
            if (!password.value) {
                passwordError.value = "Campo obbligatorio.";
            } else {
                passwordError.value = "";
            }
        };

        const submitLoginForm = async () => {
            validateUsername();
            validatePassword();

            // Verifica che non ci siano errori di validazione
            if (usernameError.value || passwordError.value) {
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username.value,
                        password: password.value,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    loginError.value = '';
                } else {
                    loginError.value = 'Credenziali non valide!';
                }
            } catch (error) {
                console.error('Errore durante il login:', error);
                loginError.value = 'Errore durante il login. Riprova.';
            }
        };

        return {
            username,
            password,
            submitLoginForm,
            usernameError,
            passwordError,
            loginError
        };
    },
};
</script>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    padding: 2em;
    background-color: #EEEEEE;
    flex: 1;
}

form {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

/* Typography */
.login-container h2 {
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

/* Button */
.button-container {
    margin-top: auto;
    text-align: center;
    padding-top: 2em;
}

.button-container p {
    padding: 20px 0 20px 0;
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

/* Error messages */
.error-message {
    margin: 5px 0 5px 0;
    color: #F00404;
    font-size: 12px;
}
</style>
