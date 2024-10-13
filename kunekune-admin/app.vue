<script setup lang="ts">
  const siteName = 'クネクネ管理ツール'
  const title = `${siteName}`

  useServerHead({
    title: title,
  })

  // FOUC対策
  const beforeLoad = ref<boolean>(true)
  onMounted(() => {
    beforeLoad.value = false
  })
</script>
<template>
  <div :class="[ beforeLoad ? 'fouc-hidden' : 'fouc-visible']">
    <NuxtLayout >
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>