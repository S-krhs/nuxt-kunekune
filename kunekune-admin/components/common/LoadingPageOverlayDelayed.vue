<script setup lang="ts">
  const props = defineProps<{
    isLoading: boolean
  }>()

  const isLoadingDelayed = ref<boolean>(props.isLoading)
  watch(
    () => props.isLoading,
    () => {
      if (props.isLoading) {
        setTimeout(() => {
          isLoadingDelayed.value = props.isLoading
        }, 300)
      } else {
        isLoadingDelayed.value = props.isLoading
      }
    },
  )
</script>
<template>
  <div v-loading.fullscreen.lock="isLoadingDelayed"></div>
</template>