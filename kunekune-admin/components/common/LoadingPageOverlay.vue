<script setup lang="ts">
  defineProps<{
    isLoading: boolean
  }>()
</script>
<template>
  <div>
    <div v-loading.fullscreen.lock="isLoading">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.loading {
  text-align: center;
  margin-inline: auto;
}
</style>