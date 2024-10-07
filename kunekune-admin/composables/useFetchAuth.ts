import type { AsyncDataRequestStatus } from "#app"

export const useFetchAuth = async (immediate: boolean = true) => {
  const config = useRuntimeConfig()
  const cdnURL = config.app.cdnURL

  const accessToken = useCookie('access_token')
  const refreshToken = useCookie('refresh_token')

  const { status, execute } = useFetch(`${cdnURL}/api/check-auth`, {
    method: 'POST',
    body: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
    credentials: 'include',
    immediate: immediate
  })
  const authStatus = computed<AsyncDataRequestStatus>(() => {
    console.log('Auth status: ', status.value)
    return status.value
  })

  const checkAuth = async (accessToken?: string | null | undefined, refreshToken?: string | null | undefined) => {
    try {
      await $fetch(`${cdnURL}/api/check-auth`, {
        method: 'POST',
        body: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        credentials: 'include',
      })
    } catch (error) {
      throw(error)
    } finally {
      await execute()
    }
  }

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      await $fetch(`${cdnURL}/api/sign-in`, {
        method: 'POST',
        body: {
          email: email,
          password: password,
        },
      })
      await navigateTo("/")
    } catch (error) {
      throw(error)
    } finally {
      await execute()
    }
  }


  const signOut = async (): Promise<void> => {
    try {
      const _results = await $fetch(`${cdnURL}/api/sign-out`, {
        method: 'GET',
        credentials: 'include',
      })
    } catch (error) {
      throw(error)
    } finally {
      await execute()
      await navigateTo("/login")
    }
  }
  

  return { authStatus, checkAuth, signIn, signOut, execute }
}

