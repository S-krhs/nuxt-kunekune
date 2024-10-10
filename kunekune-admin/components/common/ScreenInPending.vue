<script setup lang="ts">
  defineProps<{
    isPending: boolean
  }>()
</script>
<template>
  <div v-if="!isPending">
    <slot></slot>
  </div>
</template>