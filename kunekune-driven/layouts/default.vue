<script setup lang="ts">
import type { BaseApiResponse } from '~/types/api/base'
import type { Link } from '~/types/api/links'
import type { Profile } from '~/types/api/profile'

/**
 * @todo 季節に合わせて背景画像を変更
 */

  const profile = ref<Profile | null>(null)
  const links = ref<Link[]>([])

  const isLoading = ref<boolean>(true)

  const { axiosClient } = useAxiosClient()

  onBeforeMount(async () => {
    profile.value = await axiosClient<BaseApiResponse<Profile>>('/api/profile/get').then(res => res.data.data)
    links.value = await axiosClient<BaseApiResponse<Link[]>>('/api/profile/links').then(res => res.data.data ?? [])
    isLoading.value = false
  })
</script>

<template>
  <div class="super-extremely-huge-text" v-show="isLoading">クネクネ</div>
  <div class="background-gif" v-show="!isLoading">
    <div class="app default-layout">
      <header>
        <CommonHeaderMarquee :header-text="profile?.header_text ?? ''" />
      </header>
      <menu>
        <CommonSideMenu :profile="profile" :links="links"/>
      </menu>
      <main>
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<style scoped>
.super-extremely-huge-text {
  font-size: 100dvh;
  font-weight: 900;
}

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