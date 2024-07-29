<template>
    <div class="container">
        <DashboardData />
    </div>
</template>

<script setup>
import DashboardData from "../components/DashboardData.vue";
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: scroll;
}
</style>