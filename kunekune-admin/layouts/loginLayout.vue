<script setup lang="ts">
  const { isTransmitting } = useLoading()

  // FOUC対策
  const fullLoaded = ref<boolean>(false)
  onMounted(() => {
    fullLoaded.value = true
  })
</script>

<template>
  <div>
    <CommonLoadingPageOverlay :is-loading="isTransmitting" />
    <div :class="[ fullLoaded ? 'fouc-visible' : 'fouc-hidden']">
      <slot></slot>
    </div>
  </div>
</template>
