<template>
  <div v-loading.fullscreen.lock="loading.loading" element-loading-text="loading..."
    element-loading-background="rgba(0, 0, 0, 0.7)">
    <RouterView />
    <el-button @click="loading.loading = true"></el-button>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useLoadingStore } from "@/store/loading.store";
const loading = useLoadingStore();
</script>

<style></style>