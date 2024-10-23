<script setup lang="ts">
  import type { BaseApiResponse } from '~/types/api/base'
  import type { Profile } from '~/types/api/profile'

  const { data } = await useFetch<BaseApiResponse<Profile>>('/api/profile/get', {
    method: 'GET',
    credentials: 'same-origin',
    server: false,
  })
  const headerText = computed<string>(() => data.value?.data?.header_text ?? '')
</script>

<template>
  <div class="header-wrapper">
    <div class="marquee">
      <h2 class="gaming">
        {{ headerText }}
      </h2>
    </div>
  </div>
</template>
<style scoped>
.header-wrapper {
  width: 100%;
  background-color: black;
}

.marquee {
  animation: marquee 25s linear infinite;
  --child-width:10px;
}
@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-700px);
  }
}

.gaming {
  text-align: left;
  white-space: nowrap;
  animation: gaming 2s linear infinite;
}
@keyframes gaming {
  0% {color: red}
  8% {color: #ff7f00}
  16% {color: #ff0}
  25% {color: #7fff00}
  33% {color: #0f0}
  41% {color: #00ff7f}
  50% {color: #0ff}
  58% {color: #007fff}
  66% {color: #00f}
  75% {color: #7f00ff}
  83% {color: #f0f}
  91% {color: #ff007f}
}
</style>