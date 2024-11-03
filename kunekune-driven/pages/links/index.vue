<script setup lang="ts">
import type { BaseApiResponse } from '~/types/api/base';
import type { Link } from '~/types/api/links';

  const title = 'リンク集 | クネクネ駆動開発'
  useHead({
    title: title,
    meta: [
      { property: 'og:title', content: title },
    ]
  })

  const { axiosClient } = useAxiosClient()
  const links = ref<Link[]>([])

  onMounted(async () => {
    links.value = await axiosClient<BaseApiResponse<Link[]>>('/api/links/links').then(res => res.data.data ?? [])
  })
</script>

<template>
  <div class="page-wrapper">
    <h1 class='page-title'>リンク集</h1>
    <ul class="links-wrapper">
      <li v-for="link in links" :key="link.index" class="link">
        <div class="link-name">
          <span><a :href="link.link_url" target="_blank" rel="noopener noreferrer">{{ link.link_name }}</a></span>
          <span>-</span>
          <span>{{`${link.link_user}さん`}}</span>
        </div>
        <div class="link-description">
          <p>{{ link.link_description }}</p>
        </div>
      </li>
    </ul>
    <div class="main-text">
      <p >～ 当サイトはリンクフリーです ～</p>
    </div>
    <div class="banner">
      <a href="https://www.sekaiseifuku-zzz.com/" title=" TVアニメ『「世界征服～謀略のズヴィズダー～」』オフィシャルサイト" target="_blank">
        <img src="https://www.sekaiseifuku-zzz.com/img/bnr/bnr_480x100.gif" alt="世界征服～謀略のズヴィズダー～"></a>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  margin-inline: 160px;
  margin-block: 80px;
}
.page-title {
  text-align: center;
  margin-bottom: 32px;
}
@media screen and (max-width: 768px){
  .page-wrapper {
    margin-inline: 8px;
    margin-block: 20px;
  }
  .page-title {
    text-align: center;
    margin-bottom: 8px;
  }
}
.links-wrapper {
  margin-bottom: 48px;
}
.link {
  margin-bottom: 16px;
}
.link-name {
  margin-bottom: 0.2rem;
}
.link-name::before{
  content: "★";
}
.link-name > span {
  margin-left: 0.8rem;
}
.link-description{
  margin-left: 40px;
}

.main-text {
  text-align: center;
  margin-bottom: 40px;
}
.banner {
  text-align: center;
  max-width: 100%;
}
.banner > a, .banner > a > img {
  max-width: 100%;
}
</style>