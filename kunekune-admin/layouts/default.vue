<script setup lang="ts">
  const { isTransmitting } = useLoading()
</script>

<template>
  <main>
    <CommonLoadingPageOverlay :is-loading="isTransmitting">
      <header>
        logout
      </header>
    <slot></slot>
    </CommonLoadingPageOverlay>
  </main>
</template>
