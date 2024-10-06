import { createClient } from '@supabase/supabase-js'

export const useSupabase = async () => {
  const config = useRuntimeConfig()
  const supabase = createClient(
    config.supabaseUrl,
    config.supabaseAnonKey,
  )

  const setSession = async (accessToken: string, refreshToken: string) => {
    await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    })
    const { data, error } = await supabase.auth.getUser()

    const status = error?.status ?? 200
    return { data, error, status }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    const status = error?.status ?? 200
    return { data, error, status }
  }
  
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    const status = error?.status ?? 200
    return { error, status }
  }

  return { supabase, setSession, signIn, signOut }
}

