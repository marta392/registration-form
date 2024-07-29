<template>
  <div class="container">
    <SuccessMessage />
  </div>
</template>

<script setup>
import SuccessMessage from "../components/SuccessMessage.vue";
</script>

<style scoped>
.container {
  display: flex;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  margin: 0 auto;
  align-self: center;
}
</style>
