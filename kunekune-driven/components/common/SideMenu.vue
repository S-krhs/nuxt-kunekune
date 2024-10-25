<script setup lang="ts">
  import type { BaseApiResponse } from '~/types/api/base'
  import type { Link } from '~/types/api/links'
  import type { Profile } from '~/types/api/profile'

  const props = defineProps<{
    profile: Profile | null
    links: Link[]
    accessCount: string
  }>()
</script>

<template>
  <div class="sidemenu-wrapper">
    <div class="sidemenu-contents">
      <div class="access-counter">
        <p>あなたは</p>
        <div class="access-counter-pos">{{ accessCount }}</div>
        <p>人目の訪問者です</p>
      </div>
      <div class="profile">
        <div class="my-name">
          <h4>{{ profile?.profile_name ?? '' }}</h4>
        </div>
        <div class="my-icon-pos">
          <img class="my-icon-img" :alt="profile?.image_alt ?? 'icon'" :src="profile?.image_url" />
        </div>
        <div class="my-introduction">
          <h4>自己紹介</h4>
          <p v-for="row in profile?.introduction.split('\\n')">{{ row }}</p>
        </div>
      </div>
      <nav class="sidemenu-links">
        <ul class="sidemenu-main-contents">
          <li class="headline">
            <h3>メインコンテンツ</h3>
          </li>
          <li class="link">
            <NuxtLink to="/">トップ</NuxtLink>
          </li>
          <li class="link">
            <NuxtLink to="/diary">日記</NuxtLink>
          </li>
          <li class="link">
            <NuxtLink to="/blog">ブログ</NuxtLink>
          </li>
          <li class="link">
            <NuxtLink to="/works">イラスト</NuxtLink>
          </li>
          <li class="link">
            <NuxtLink to="/links">リンク集</NuxtLink>
          </li>
        </ul>
        <ul class="sidemenu-external-links">
          <li class="headline">
            <h3>その他リンク</h3>
          </li>
          <li class="link" v-for="link in links">
            <a :href="link.external_link_url" target="_blank">{{ link.external_link_display }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.sidemenu-wrapper {
  min-height: 100%;
  background-image: url('@/assets/images/background/check-background.jpg');
}
.sidemenu-contents {
  padding-block: 24px;
  padding-inline: 8px;
}
.sidemenu-contents p {
  font-size: small;
  text-align: center;
}

.access-counter {
  padding-top: 12px;
  padding-bottom: 12px;
}
.access-counter-pos {
  margin: auto;
  width: 180px;
  height: 24px;
  background-color: #000;
  text-align: center;
  line-height: 24px;
  text-indent: 0.6em;
  letter-spacing: 0.6em;
  color: white;
}

.profile {
  margin-top: 8px;
}
.my-name {
  text-align: center;
  font-size: large;
  height: 32px;
}
.my-icon-pos {
  margin: auto;
  width: 172px;
  height: 172px;
  /* background-color: #cccccc; */
}
.my-icon-img {
  width: 100%;
  height: auto;
}
.my-introduction {
  margin-top: 16px;
  margin-bottom: 12px;
  text-align: center;
  height: 80px;
}
.my-introduction > h4 {
  margin-bottom: 4px;
}

.sidemenu-links {
  height: 100%;
  width: 100%;
}
.sidemenu-links ul {
  margin-block: 32px;
}
.sidemenu-links li {
  list-style: none;
  text-align: left;
  margin-bottom: 8px;
}
.headline {
  margin-left: 10px;
}
.link{
  line-height: 24px;
  text-decoration: underline;
  margin-left: 16px;
}
</style>