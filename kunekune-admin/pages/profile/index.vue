<script setup lang="ts">
import type { BaseApiResponse } from '~/types/api'

  const { data: data1 } = useFetch<BaseApiResponse<any>>('/api/test/query', {
    method: 'GET',
    credentials: 'same-origin',
  })

</script>

<template>
  <div>
    <div>{{ data1 }}</div>
  </div>
</template>

