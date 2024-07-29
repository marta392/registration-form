<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="submitLoginForm">
            <div class="input-box">
                <input type="text" id="username" placeholder="Username" v-model="username" required />
                <div class="underline"></div>
            </div>
            <div class="input-box">
                <input type="password" id="password" placeholder="Password" v-model="password" required />
                <div class="underline"></div>
            </div>
            <div class="button-container">
                <button class="button-form" type="submit">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
    setup() {

    },
};
</script>

<style scoped>
.login-container {
    padding: 2em;
    background-color: #EEEEEE;
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
</style>
