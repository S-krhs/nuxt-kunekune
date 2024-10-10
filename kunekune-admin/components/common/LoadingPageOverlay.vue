<script setup lang="ts">
  defineProps<{
    isLoading: boolean
  }>()
</script>
<template>
  <div v-loading.fullscreen.lock="isLoading">
    <slot></slot>
  </div>
</template>
<style scoped>
.loading {
  text-align: center;
  margin-inline: auto;
}
</style>