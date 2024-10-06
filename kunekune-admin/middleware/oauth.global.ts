export default defineNuxtRouteMiddleware(async (to, from) => {

  if (to.path === '/login') return

  const res = await fetch('http://localhost:19797/api/check-auth', {
    method: 'GET',
    credentials: 'include',
  })
  console.log(res)
  if(res.status !== 200){
    return navigateTo('/login', { replace: true })
  }
  
  return 
})
