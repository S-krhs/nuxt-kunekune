<script setup lang="ts">
  import type { BaseApiResponse } from '~/types/api/base'
  import type { IllustWork } from '~/types/api/works'

  const title = 'ブログ | クネクネ駆動開発'
  useHead({
    title: title,
    meta: [
      { property: 'og:title', content: title },
    ]
  })

  const router = useRoute()
  const { axiosClient } = useAxiosClient()
  const works = ref<IllustWork[]>([])


  onMounted(async () => {

  })
  onUpdated(() => {

  })
</script>

<template>
  <div class="page-wrapper">
    <h1 class='page-title'>ブログ</h1>
    <h2 class="main-text">～ 準備中 ～</h2>
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
.main-text {
  text-align: center;
  margin-bottom: 40px;
}

</style>