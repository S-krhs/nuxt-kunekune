<script setup lang="ts">
  import axios from 'axios'
  import type { BaseApiResponse } from '~/types/api/base'
  import type { Profile } from '~/types/api/profile'

  const profile = ref<Profile | null>()

  onMounted(async () => {
    profile.value = await axios<BaseApiResponse<Profile>>('/api/profile/get').then(res => res.data.data)
  })
</script>

<template>
  <div class="sidemenu-wrapper">
    <div class="sidemenu-contents">
      <div class="access-counter">
        <p>あなたは</p>
        <div class="access-counter-pos">12345678</div>
        <p>人目の訪問者です</p>
        <!-- そんなわけないだろ(ゴンテテ日記) -->
      </div>
      <div class="profile">
        <div class="my-name">
          <h4>{{ profile?.profile_name }}</h4>
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
            Main Contents
          </li>
          <li class="link">
            <NuxtLink to="/">トップ</NuxtLink>
          </li>
          <li class="link">
            <NuxtLink to="/">日記</NuxtLink>
          </li>
          <li class="link">
            <NuxtLink to="/">ブログ</NuxtLink>
          </li>
          <li class="link">
            <NuxtLink to="/works">イラスト</NuxtLink>
          </li>
          <li class="link">
            <NuxtLink to="/">リンク集</NuxtLink>
          </li>
        </ul>
        <ul class="sidemenu-external-links">
          <li class="headline">
            Links
          </li>
          <li class="link">
            <a href="/">Twitter</a>
          </li>
          <li class="link">
            <a href="/">pixiv</a>
          </li>
          <li class="link">
            <a href="/">GitHub</a>
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
}
.my-icon-pos {
  margin: auto;
  width: 172px;
  height: 172px;
}
.my-icon-img {
  width: 100%;
  height: auto;
}
.my-introduction {
  margin-top: 16px;
  margin-bottom: 12px;
  text-align: center;
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
  font-family: Monotype Corsiva;
  font-style: italic;
  font-size: x-large;
  font-weight: 600;
  margin-left: 10px;
}
.link{
  line-height: 24px;
  text-decoration: underline;
  margin-left: 16px;
}
</style>