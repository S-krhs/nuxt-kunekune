<script setup lang="ts">
  const signOut = async () => {
    const config = useRuntimeConfig()
    const cdnURL = config.app.cdnURL
    const res = await $fetch(`${cdnURL}/api/sign-out`, {
      method: 'GET',
      credentials: 'include',
    })
    await navigateTo("/login")
  }
</script>

<template>
  <div>
    <p>index</p>
    <NuxtLink to="/login"><button>back to login page</button></NuxtLink>
    <button @click="signOut()">signOut</button>
  </div>
</template>