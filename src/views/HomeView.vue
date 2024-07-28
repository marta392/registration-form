<template>
  <div class="container">
      <BannerForm />
      <RegistrationForm />
  </div>
</template>

<script setup>
import BannerForm from "../components/BannerForm.vue";
import RegistrationForm from "../components/RegistrationForm.vue";
</script>

<style scoped>
.container {
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  overflow: hidden;
}

@media (min-width: 768px) {
.container {
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  }
}
</style>
