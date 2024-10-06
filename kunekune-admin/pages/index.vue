<script setup lang="ts">
  const config = useRuntimeConfig()
  const cdnURL = config.app.cdnURL
  const signOut = async () => {
    const res = await $fetch(`http://${cdnURL}/api/sign-out`, {
      method: 'GET',
      credentials: 'include',
    })
    console.log(res)
    await navigateTo("/login")
  }
</script>

<template>
  <div>
    <p>index</p>
    <NuxtLink to="/login"><button>login page</button></NuxtLink>
    <button @click="signOut()">singOut</button>
  </div>
</template>