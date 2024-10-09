import type { AsyncDataRequestStatus } from "#app"
import { FetchError } from 'ofetch'

export const useFetchAuth = async (immediate: boolean = true) => {
  const config = useRuntimeConfig()
  const cdnURL = config.app.cdnURL

  // SSRの場合はリクエストにcookieを手動追加
  const headers: HeadersInit = useRequestHeaders(['cookie'])

  const { status, execute } = useFetch(`${cdnURL}/api/check-auth`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: headers,
    immediate: immediate,
  })
  const authStatus = computed<AsyncDataRequestStatus>(() => status.value)
  const loginError = ref<boolean>(false)

  const setLoginError = (value: boolean) => { loginError.value = value }

  const signIn = async (email: string, password: string): Promise<void> => {
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
      loginError.value = false
    } catch (error) {
      if (error instanceof FetchError && error.status === 401) {
        loginError.value = true
      } else {
        throw(error)
      }
    }
  }


  const signOut = async (): Promise<void> => {
    try {
      await $fetch(`${cdnURL}/api/sign-out`, {
        method: 'GET',
        credentials: 'same-origin',
      })
    } catch (error) {
      console.error(error)
      throw(error)
    } finally {
      await execute()
      await navigateTo("/login")
    }
  }
  

  return {
    authStatus: readonly(authStatus),
    loginError: readonly(loginError),
    setLoginError,
    signIn,
    signOut,
    execute
  }
}

