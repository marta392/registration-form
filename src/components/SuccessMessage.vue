<template>
  <div class="message-container">
    <div>
      <img src="../assets/logo.svg" alt="logo" />
    </div>
    <h2>Registrazione avvenuta con successo!</h2>
    <p>
      Ciao <strong>{{ name }}</strong>! <br />Siamo entusiasti di darti il
      benvenuto nella nostra community di appassionati e professionisti della tecnologia.
    </p>
    <p>
      A breve riceverai un'email di conferma con tutti i dettagli
      relativi ai corsi a cui ti sei iscritto, comprese le date di inizio, i requisiti e le modalità di accesso.
    </p><br />
    <p>Se hai domande o necessiti di ulteriori informazioni, non esitare a contattarci all'indirizzo <a
        href="mailto:support@startech.com ">support@startech.com</a>.
    </p>
    <div class="button-container">
      <button @click="goHome">Torna alla home</button>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const name = route.params.name; // Recupera il parametro 'name' dalla route

    const goHome = () => {
      router.push({ name: 'home' }); // Reindirizza alla home page
    };

    return {
      name,
      goHome
    };
  }
};
</script>

<style scoped>
.message-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2em;
  background-color: #2E0249;
  color: #EEEEEE;
  text-align: center;
}

.message-container h2 {
  font-size: 1.8em;
  font-weight: bold;
  margin: 15px 0 15px 0;
}

.message-container p {
  line-height: 1.5em;
}

.message-container a {
  color: #ff00af;
  text-decoration: none;
  font-weight: 600;
}

/* Button */
.button-container {
  margin-top: auto;
  text-align: center;
  padding-top: 2em;
}

.button-container button {
  border-radius: 20px;
  background-color: rgba(87, 10, 87, 0.8);
  border: 1px solid #A91079;
  color: #EEEEEE;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
}

.button-container button:hover {
  opacity: 0.7;
}
</style>