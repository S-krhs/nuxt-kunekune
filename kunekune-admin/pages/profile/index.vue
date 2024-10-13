<script setup lang="ts">
import type { BaseApiResponse } from '@/server/types/api'

  const { data, status, execute } = useFetch<BaseApiResponse>('/api/test/query', {
    method: 'GET',
    credentials: 'same-origin',
  })

</script>

<template>
  <div>
    <div>{{ data }}</div>
    <div>{{ status }}</div>
  </div>
</template>

