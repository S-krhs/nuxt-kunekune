import { CookieOptions, createServerClient, parseCookieHeader } from '@supabase/ssr'
import type { H3Event } from 'h3'



export const useAuthenticatedSupabase = async (event: H3Event) => {
  const config = useRuntimeConfig()

  // 期限を1時間後に設定
  const defaultCookieOptions = {
    httpOnly: true,
    Secure: true,
    maxAge: 3600,
  }

  const supabase = async () => {
    const _supabase = createServerClient(
      config.supabaseUrl,
      config.supabaseAnonKey,
      {
        cookies: {
          getAll: () => parseCookieHeader(getHeader(event, 'Cookie') ?? ''),
          setAll: (
            cookies: {
              name: string
              value: string
              options: CookieOptions
            }[],
          ) => cookies.forEach(({ name, value, options }) => setCookie(event, name, value, { ...options, ...defaultCookieOptions })),
        }
      }
    )
    const { error } = await _supabase.auth.getUser()
    if (error) {
      // 有効なcookieがない場合ログイン
      const { error: signInError } = await _supabase.auth.signInWithPassword({
        email: config.supabaseEmail,
        password: config.supabasePassword,
      })
      if (signInError) {
        throw(signInError)
      }

      // ログイン時にアクセス数追加
      const { data } = await _supabase
        .from('access_counts')
        .select('access_count')
      if( data?.length ) {
        await _supabase
          .from('access_counts')
          .update({ access_count: data[0].access_count + 1 })
          .eq('tenant_id', config.tenantId)
      }
    }

    return _supabase
  }

  return { supabase: await supabase() }
}

