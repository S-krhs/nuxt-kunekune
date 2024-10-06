export default defineNuxtRouteMiddleware(async (to, from) => {

  if (to.path === '/login') return
  
  const config = useRuntimeConfig()
  const cdnURL = config.app.cdnURL
  const res = await fetch(`${cdnURL}/api/check-auth`, {
    method: 'GET',
    credentials: 'include',
  })
  console.log(res)
  if(res.status !== 200){
    return navigateTo('/login', { replace: true })
  }
  
  return 
})
