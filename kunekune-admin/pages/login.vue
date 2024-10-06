<script setup lang="ts">
  const email = ref<string>('')
  const password = ref<string>('')
  const loginStatus = ref<string>('ログインしていません')

  const config = useRuntimeConfig()
  const cdnURL = config.app.cdnURL

  const signIn = async (): Promise<void> => {
    const res = await $fetch(`http://${cdnURL}/api/sign-in`, {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    })
    console.log(res)
    await navigateTo("/")
  }
  const checkSession = async () => {
    const res = await $fetch(`http://${cdnURL}/api/check-auth`, {
      method: 'GET',
      credentials: 'include',
    })
    console.log(res)
    loginStatus.value = 'ログインしています'
  }

  const signOut = async () => {
    const res = await $fetch(`http://${cdnURL}/api/sign-out`, {
      method: 'GET',
      credentials: 'include',
    })
    console.log(res)
    loginStatus.value = 'ログインしていません'
    await navigateTo("/login")
  }
  
  onBeforeMount(async () => {
    await checkSession()
  })
</script>

<template>
  <div>
    <p>login(仮)</p>
    <p>{{ loginStatus }}</p>
    <input v-model="email">
    <input v-model="password">
    <button @click="signIn()">signIn</button>
    <button @click="checkSession()">checkSession</button>
    <button @click="signOut()">singOut</button>
    <NuxtLink to="/"><button>index</button></NuxtLink>
  </div>
</template>