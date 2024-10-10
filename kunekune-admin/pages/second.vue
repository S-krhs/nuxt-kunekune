<script setup lang="ts">
  const { signOut } = await useFetchAuth({ immediate: false })
</script>

<template>
  <div>
    <p>second</p>
    <NuxtLink to="/"><button>index</button></NuxtLink>
    <NuxtLink to="/login"><button>back to signIn page</button></NuxtLink>
    <button @click="signOut()">signOut</button>
  </div>
</template>