<script setup lang="ts">
  const { isTransmitting } = useLoading()
</script>

<template>
  <CommonLoadingPageOverlayDelayed :is-loading="isTransmitting" />
  <div class="main-layout">
    <CommonHeader class="header-pos"></CommonHeader>
    <CommonSidemenu class="sidemenu-pos"></CommonSidemenu>
    <main class="main-pos">
      <slot></slot></main>
  </div>
</template>

<style scoped>
.main-layout {
  height: 100dvh;
  display: grid;
  grid-template:
    "header header"
    "sidemenu main";
  grid-template-rows: 56px auto;
  grid-template-columns: 280px auto;
}
.header-pos {
  grid-area: header;
}
.sidemenu-pos {
  grid-area: sidemenu;
}
.main-pos {
  grid-area: main;
}
</style>
