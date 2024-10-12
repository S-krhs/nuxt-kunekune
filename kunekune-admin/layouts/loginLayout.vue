<script setup lang="ts">
  const { isTransmitting } = useLoading()
</script>

<template>
  <div>
    <CommonLoadingPageOverlay :is-loading="isTransmitting" />
    <slot></slot>
  </div>
</template>
