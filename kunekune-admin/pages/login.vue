<script setup lang="ts">
  import { useFetchAuth } from '~/composables/useFetchAuth'

  const email = ref<string>('')
  const password = ref<string>('')
  const { authStatus, signIn, checkAuth, signOut } = await useFetchAuth()
  const loginStatus = computed<string>(() => {
    let loginStatus = '通信中'
    if (authStatus.value === 'success') {
      loginStatus = 'ログインしています'
    } else if (authStatus.value === 'error'){
      loginStatus = 'ログインしていません'
    }
    return loginStatus
  })
</script>

<template>
  <div>
    <p>login(仮)</p>
    <p>{{ loginStatus }}</p>
    <input v-model="email">
    <input v-model="password">
    <button @click="signIn(email, password)">signIn</button>
    <button @click="checkAuth()">checkAuth</button>
    <button @click="signOut()">signOut</button>
    <NuxtLink to="/"><button>index</button></NuxtLink>
  </div>
</template>