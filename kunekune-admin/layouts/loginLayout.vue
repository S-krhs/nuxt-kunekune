<script setup lang="ts">
  const { isTransmitting } = useLoading()
</script>

<template>
  <div>
    <CommonLoadingPageOverlay :is-loading="isTransmitting" />
    <div>
      <slot></slot>
    </div>
  </div>
</template>
