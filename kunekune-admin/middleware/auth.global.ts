export default defineNuxtRouteMiddleware(async (to, from) => {

  const { setSignedIn } = useSession()

  // ログインページは認証不要
  if (to.path === '/login' || to.path === '/error') return

  // 画面遷移時の認証
  const { asyncWithLoading } = useLoading()
  const { status, executeUseFetchAuth } = await useFetchAuth({ immediate: false })

  const execute = asyncWithLoading(executeUseFetchAuth)
  await execute()

  if (status.value !== 'success') {
    setSignedIn(false)
    return navigateTo('/login', { replace: true })
  }
  
  return
})
