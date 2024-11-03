<script setup lang="ts">
import type { access } from '~/types/api/access'
import type { BaseApiResponse } from '~/types/api/base'
import type { Link } from '~/types/api/links'
import type { Profile } from '~/types/api/profile'

/**
 * @todo 季節に合わせて背景画像を変更
 */
  const config = useRuntimeConfig()
  const cdnURL = config.app.cdnURL

  const siteName = 'クネクネ駆動開発'
  const title = 'クネクネ駆動開発'
  const description = '脳がふにゃふにゃによる個人サイトです。'
  const ogImagePath = `${cdnURL}/og-image.jpg`

  useServerHead({
    title: title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: "og:locale", content: "ja_JP" },
      { property: 'og:site_name', content: siteName },
      { property: 'og:image', content: ogImagePath, },
      { property: "twitter:card", content: 'summary' },
      { property: 'twitter:image', content: ogImagePath, },
    ]
  })

  const profile = ref<Profile | null>(null)
  const links = ref<Link[]>([])
  const accessCount = ref<string>('99999999')

  const isLoading = ref<boolean>(true)

  const { axiosClient } = useAxiosClient()

  onBeforeMount(async () => {
    // todo: 並列化・cookie取得の分離
    profile.value = await axiosClient<BaseApiResponse<Profile>>('/api/profile/profile').then(res => res.data.data)
    links.value = await axiosClient<BaseApiResponse<Link[]>>('/api/profile/links').then(res => res.data.data ?? [])
    accessCount.value = await axiosClient<BaseApiResponse<access>>('/api/access/count').then(res => String(res.data.data).padStart(8, '0') ?? '99999999')
    isLoading.value = false
  })
</script>

<template>
  <div class="background-gif">
    <div class="loading-layout" v-show="isLoading">
      <p class="loading-text">少女クネクネ中...</p>
    </div>
    <div class="app default-layout" v-show="!isLoading">
      <header>
        <CommonHeaderMarquee :header-text="profile?.header_text ?? ''" />
      </header>
      <menu>
        <CommonSideMenu :profile="profile" :links="links" :access-count="accessCount"/>
      </menu>
      <main>
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<style scoped>
.background-gif {
  height: 100dvh;
  width: 100dvw;

  background-color: black;
  background-image: url('@/assets/images/background/k-yuki10-ma.gif')
}

.loading-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
}
.loading-text {
  text-align: right;
  margin-right: 2rem;
  color: #ffffff;
  font-family: 'Noto Serif JP', serif;
  font-size: 6rem;
  font-weight: 600;
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
  max-width: 100dvw;
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
  background-color: #dddddd;
}
</style>