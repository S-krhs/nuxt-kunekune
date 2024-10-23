import { CookieOptions, createServerClient, parseCookieHeader } from '@supabase/ssr'
import type { H3Event } from 'h3'

const defaultCookieOptions = {
  httpOnly: true,
  Secure: true,
}

export const useAuthenticatedSupabase = async (event: H3Event) => {
  const config = useRuntimeConfig()

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
      const { error: signInError } = await _supabase.auth.signInWithPassword({
        email: config.supabaseEmail,
        password: config.supabasePassword,
      })
      if (signInError) {
        throw(signInError)
      }
    }

    return _supabase
  }

  return { supabase: await supabase() }
}

