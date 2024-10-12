<script setup lang="ts">
  const siteName = 'クネクネ管理ツール'
  const title = `${siteName}`

  useServerHead({
    title: title,
  })
</script>
<template>
  <NuxtLayout >
    <NuxtPage />
  </NuxtLayout>
</template>