<script setup lang="ts">
  const { isTransmitting } = useLoading()

  // FOUC対策
  const beforeLoad = ref<boolean>(true)
  onMounted(() => {
    beforeLoad.value = false
  })
</script>

<template>
  <div>
    <CommonLoadingPageOverlay :is-loading="isTransmitting || beforeLoad" />
    <div :class="[ beforeLoad ? 'fouc-hidden' : 'fouc-visible']">
      <slot></slot>
    </div>
  </div>
</template>
