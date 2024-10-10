export default defineNuxtRouteMiddleware(async (to, from) => {

  const { setSignedIn } = useSession()

  // ログインページは認証不要
  if (to.path === '/login') return

  // 画面遷移時の認証
  const { setTransmitting } = useLoading()
  setTransmitting(true)

  const { status, executeUseFetchAuth } = await useFetchAuth({ immediate: false })
  await executeUseFetchAuth()

  setTransmitting(false)

  if (status.value !== 'success') {
    setSignedIn(false)
    return navigateTo('/login', { replace: true })
  }
  
  return
})
