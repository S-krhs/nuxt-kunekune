<script setup lang="ts">
  defineProps<{
    isLoading: boolean
  }>()
</script>
<template>
  <div>
    <div v-loading.fullscreen.lock="isLoading" class="loading" v-if="isLoading"></div>
    <slot v-else></slot>
  </div>
</template>
<style scoped>
.loading {
  text-align: center;
  margin-inline: auto;
}
</style>