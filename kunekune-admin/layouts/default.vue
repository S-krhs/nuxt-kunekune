<script setup lang="ts">
  const { isTransmitting } = useLoading()
</script>

<template>
  <div class="main-layout">
    <CommonLoadingPageOverlay :is-loading="isTransmitting" />
    <CommonHeader class="header-pos"></CommonHeader>
    <slot class="main-pos"></slot>
  </div>
</template>

<style scoped>
.main-layout {
  display: grid;
  grid-template:
    "header header"
    "sidemenu main";
  grid-template-rows: 56px auto;
  grid-template-columns: auto;
}
.header-pos {
  grid-area: header;
}
.main-pos {
  grid-area: main;
}
</style>
