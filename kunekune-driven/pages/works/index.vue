<script setup lang="ts">
  import type { BaseApiResponse } from '~/types/api/base'
  import type { IllustWork } from '~/types/api/works'

  const config = useRuntimeConfig()
  const cdnURL = config.app.cdnURL
  const title = '作品集 | クネクネ駆動開発'
  const ogImagePath = `${cdnURL}/og-image.jpg`

  const metaImagePath = ref<string>(ogImagePath)
  
  useHead({
    title: title,
    meta: [
      { property: 'og:title', content: title },
      { property: 'og:image', content: () => metaImagePath.value, },
      { property: 'twitter:image', content: () => metaImagePath.value, },
    ]
  })

  const router = useRoute()
  const { axiosClient } = useAxiosClient()
  const works = ref<IllustWork[]>([])
  const displayWork = ref<IllustWork>()

  onMounted(async () => {
    works.value = await axiosClient<BaseApiResponse<IllustWork[]>>('/api/works/get').then(res => res.data.data ?? [])
  })
  onUpdated(() => {
    displayWork.value = router.query.id ? works.value.find(elem => elem.id === Number(router.query.id)) : works.value.at(-1)
    metaImagePath.value = (router.query.id ? works.value.find(elem => elem.id === Number(router.query.id))?.work_url : works.value.at(-1)?.work_url) ?? ogImagePath
  })
</script>

<template>
  <div class="page-wrapper">
    <h1 class='page-title'>イラスト</h1>
    <div class="works-wrapper">
      <div class="work-links">
        <NuxtLink v-for="work in works" :key="work.id" class="work-link" :to="{
          path: '/works',
          query: { id: work.id },
        }">
          <span>■</span>
        </NuxtLink>
      </div>
      <div class="work" v-if="displayWork">
        <img :src="displayWork.work_url" :alt="`work-${displayWork.date}`" class="work-image">
      </div>
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
.works-wrapper {
  margin-bottom: 48px;
}
.work-links {
  margin-bottom: 32px;
}
.work-link {
  font-size: 40px;
  margin-left: 8px;
  text-decoration-thickness: 0.04rem;
  word-wrap: break-word;
}
.work {
  width: 100%;
  aspect-ratio: 1;
}
@media screen and (max-width: 768px){
  .work-link {
    font-size: 32px;
    margin-left: 6px;
    text-decoration-thickness: 0.04rem;
    word-wrap: break-word;
  }
  .work {
    aspect-ratio: unset;
  }
}
.work-image {
  max-width: 100%;
  max-height: 100%;
  text-align: center;
}
</style>