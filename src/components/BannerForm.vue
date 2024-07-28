<template>
	<div class="banner-container">
		<div>
			<img src="../assets/logo.svg" alt="logo" />
		</div>
		<h2>Let's connect!</h2>
		<p>
			Offriamo percorsi formativi per sviluppare le competenze richieste dal
			mercato del lavoro moderno. </p><br />
		<p><i> Registrati, scopri i nostri corsi e come possiamo aiutarti
				a raggiungere i tuoi obiettivi professionali. </i>
		</p>
	</div>
</template>

<script setup></script>

<style scoped>
.banner-container {
	padding: 2em;
	background-color: #2E0249;
	color: #EEEEEE;
	text-align: center;
}

.banner-container h2 {
	font-size: 1.8em;
	font-weight: bold;
	margin: 15px 0 15px 0;
}

.banner-container p {
	line-height: 1.5em;
}

.banner-container p i {
	margin-top: 10px;
	font-weight: 500;
}

@media (min-width: 768px) {
	.banner-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
	}
}
</style>
