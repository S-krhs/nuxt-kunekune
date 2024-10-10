import { FetchError } from 'ofetch'

export type UseFetchAuth = {
  immediate: boolean;
}

export const useFetchAuth = async (opts?: UseFetchAuth) => {

  const config = useRuntimeConfig()
  const cdnURL = config.app.cdnURL

  // SSRの場合はリクエストにcookieを手動追加
  const headers: HeadersInit = useRequestHeaders(['cookie'])

  const { status, execute } = useFetch(`${cdnURL}/api/check-auth`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: headers,
    immediate: opts?.immediate ?? true,
  })

  // サインインステータス
  const { setSignedIn } = useSession()

  // 通信中
  const isPending = computed<boolean>(() => status.value === 'idle' || status.value === 'pending')
  const { setTransmitting } = useLoading()
  
  // 認証エラー条件
  const isUnauthorized = (error: unknown) => {
    return (error instanceof FetchError && error.status === 401)
  }

  // 認証チェック
  const executeUseFetchAuth = async () => {
    setTransmitting(true)
    try {
      await execute()
    } catch (error) {
      if (!isUnauthorized(error)) {
        throw(error)
      }
    } finally {
      if (status.value === 'success') {
        setSignedIn(true)
      } else {
        setSignedIn(false)
      }
      setTransmitting(false)
    }
  }

  // サインイン
  const signIn = async (email: string, password: string): Promise<void> => {
    setTransmitting(true)
    try {
      await $fetch(`${cdnURL}/api/sign-in`, {
        method: 'POST',
        body: {
          email: email,
          password: password,
        },
        credentials: 'same-origin',
      })
      await navigateTo("/")
      setSignedIn(true)
    } catch (error) {
      if (!isUnauthorized(error)) {
        throw(error)
      }
    } finally {
      setTransmitting(false)
    }
  }

  // サインアウト
  const signOut = async (): Promise<void> => {
    setTransmitting(true)
    try {
      await $fetch(`${cdnURL}/api/sign-out`, {
        method: 'GET',
        credentials: 'same-origin',
      })
    } catch (error) {
      console.error(error)
      throw(error)
    } finally {
      setSignedIn(false)
      setTransmitting(false)
      await navigateTo("/login")
    }
  }
  

  return {
    status: readonly(status),
    isPending: readonly(isPending),
    signIn,
    signOut,
    executeUseFetchAuth,
  }
}

