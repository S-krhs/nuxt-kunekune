export default defineNuxtRouteMiddleware(async (to, from) => {
  
  if (to.path === '/login') return

  const { authStatus, execute } = await useFetchAuth(false)
  await execute()

  if(authStatus.value !== 'success'){
    return navigateTo('/login', { replace: true })
  }
  
  return
})
