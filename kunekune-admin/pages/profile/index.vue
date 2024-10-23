<script setup lang="ts">
import type { BaseApiResponse } from '@/server/types/api'

  const { data: data1 } = useFetch<BaseApiResponse>('/api/test/query', {
    method: 'GET',
    credentials: 'same-origin',
  })

</script>

<template>
  <div>
    <div>{{ data1 }}</div>
  </div>
</template>

