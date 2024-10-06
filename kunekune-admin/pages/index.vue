<script setup lang="ts">
  const signOut = async () => {
    const res = await $fetch('http://localhost:19797/api/sign-out', {
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