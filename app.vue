<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
  const config = useRuntimeConfig()
  const cdnURL = config.app.cdnURL

  const siteName = 'クネクネ駆動開発'
  const title = `TOP | ${siteName}`
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
</script>