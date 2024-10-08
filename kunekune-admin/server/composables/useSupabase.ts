import { CookieOptions, createServerClient, parseCookieHeader } from '@supabase/ssr'
import type { H3Event } from 'h3'
import { useRequestEvent } from 'nuxt/app'


export const useSupabase = async (event: H3Event) => {
  const config = useRuntimeConfig()
  const supabase = createServerClient(
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
        ) => cookies.forEach(({ name, value, options }) => setCookie(event, name, value, options)),
      }
    }
  )

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser()

    const status = !error?.status
      ? 200
      : error?.status === 400
        ? 401 : error?.status
    return { data, error, status }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    const status = !error?.status
      ? 200
      : error?.status === 400
        ? 401 : error?.status
    return { data, error, status }
  }
  
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    const status = !error?.status
      ? 200
      : error?.status
    return { error, status }
  }

  return { supabase, getUser, signIn, signOut }
}

