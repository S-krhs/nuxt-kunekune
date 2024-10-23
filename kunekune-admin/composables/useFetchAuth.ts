import { FetchError } from 'ofetch'
import { apiPathCheckAuth, apiPathSignIn, apiPathSignOut } from '@/constants/paths';
import type { BaseApiResponse } from '~/types/api';

export type UseFetchAuth = {
  immediate: boolean;
}

/**
 * 
 * @param opts immediate: 認証チェックを即時実施するかどうか
 * @returns
 *  status: 認証チェックの状況 success/error/pending/idle,
 *  isPending: 認証チェック結果が未確定か,
 *  signIn: サインインを実施,
 *  signOut: サインアウトを実施,
 *  executeUseFetchAuth: 認証チェックを実施
 */
export const useFetchAuth = async (opts?: UseFetchAuth) => {

  // SSRの場合はリクエストにcookieを手動追加
  const headers: HeadersInit = useRequestHeaders(['cookie'])

  const { status, execute } = useFetch<BaseApiResponse<string>>(apiPathCheckAuth, {
    method: 'GET',
    credentials: 'same-origin',
    headers: headers,
    immediate: opts?.immediate ?? true,
  })

  // サインインステータス
  const { setSignedIn } = useSession()

  // ステータス更新中フラグ
  const isPending = computed<boolean>(() => status.value === 'idle' || status.value === 'pending')
  
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
      const isSucceeded = status.value === 'success'
      setSignedIn(isSucceeded)
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

