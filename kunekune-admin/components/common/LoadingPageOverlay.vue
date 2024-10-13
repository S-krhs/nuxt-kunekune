<script setup lang="ts">
  const props = defineProps<{
    isLoading: boolean
  }>()

</script>
<template>
  <div v-loading.fullscreen.lock="isLoading"></div>
</template>