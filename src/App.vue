<template>
  <div>
    <RouterView v-loading.fullscreen.lock="loading.loading" element-loading-text="loading..."
      element-loading-background="rgba(0, 0, 0, 0.7)" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useLoadingStore } from "@/store/loading.store";
const loading = useLoadingStore();
</script>

<style></style>