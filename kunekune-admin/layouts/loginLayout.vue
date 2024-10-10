<script setup lang="ts">
  const { isTransmitting } = useLoading()
</script>

<template>
  <main>
    <CommonLoadingPageOverlay :is-loading="isTransmitting">
      <slot></slot>
    </CommonLoadingPageOverlay>
  </main>
</template>
