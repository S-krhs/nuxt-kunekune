import { FetchError } from 'ofetch'
import { apiPathCheckAuth, apiPathSignIn, apiPathSignOut } from '@/constants/paths';
import type { BaseApiResponse } from '@/server/types/api';

export type UseFetchAuth = {
  immediate: boolean;
}

export const useFetchAuth = async (opts?: UseFetchAuth) => {

  // SSRの場合はリクエストにcookieを手動追加
  const headers: HeadersInit = useRequestHeaders(['cookie'])

  const { status, execute } = useFetch<BaseApiResponse>(apiPathCheckAuth, {
    method: 'GET',
    credentials: 'same-origin',
    headers: headers,
    immediate: opts?.immediate ?? true,
  })

  // サインインステータス
  const { setSignedIn } = useSession()

  // ステータス更新中フラグ
  const isPending = computed<boolean>(() => status.value === 'idle' || status.value === 'pending')

  // 通信中フラグ
  const { setTransmitting } = useLoading()
  
  // 認証エラー条件
  const isUnauthorized = (error: unknown) => {
    return (error instanceof FetchError && error.status === 401)
  }

  // 認証チェック
  const executeUseFetchAuth = async () => {
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
    }
  }

  // サインイン
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      await $fetch(apiPathSignIn, {
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
    }
  }

  // サインアウト
  const signOut = async (): Promise<void> => {
    try {
      await $fetch(apiPathSignOut, {
        method: 'GET',
        credentials: 'same-origin',
      })
    } catch (error) {
      console.error(error)
      throw(error)
    } finally {
      setSignedIn(false)
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

