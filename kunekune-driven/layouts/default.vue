<script setup lang="ts">
/**
 * @todo 季節に合わせて背景画像を変更
 */
</script>

<template>
  <div class="background-gif">
    <div class="app default-layout">
      <header>
        <CommonHeaderMarquee />
      </header>
      <menu>
        <CommonSideMenu />
      </menu>
      <main>
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<style scoped>
.background-gif {
  background-color: black;
  background-image: url('@/assets/images/background/k-yuki10-ma.gif')
}

.app {
  max-width: 1350px;
  height: 100dvh;
  margin-inline: auto;

  overflow: hidden;
  background-color: white;
}
@media screen and (max-width: 768px){
  .app {
    min-width: 360px;
  }
}

.default-layout {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidemenu main";
  grid-template-columns: 230px auto;
  grid-template-rows: 36px auto;
}
@media screen and (max-width: 768px){
  .default-layout {
    grid-template-areas: 
      "header"
      "topmenu"
      "main";
    grid-template-columns: auto;
    grid-template-rows: 36px 70px auto;
  }
}

header {
  grid-area: header;
}
menu {
  grid-area: sidemenu;
  overflow-y: scroll;
}
@media screen and (max-width: 768px){
  menu {
    grid-area: topmenu;
    overflow-y: auto;
  }
}
main {
  grid-area: main;
  overflow-y: auto;
}
</style>