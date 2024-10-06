import { useSupabase } from "../composables/useSupabase"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = body.email
  const password = body.password

  const accessToken = getCookie(event, 'access_token')
  const refreshToken = getCookie(event, 'refresh_token')

  const { signIn, setSession } = await useSupabase()

  if(accessToken && refreshToken){
    const { data, error, status } = await setSession(accessToken, refreshToken)
    if (status === 200) {
      event.node.res.statusCode = status
      event.node.res.end(JSON.stringify({ data: data.user?.aud, error: error }))
      return
    }
  }
  
  const { data, error, status } = await signIn(email, password)

  if (status === 200) {
    const cookieOptions = { httpOnly: true, secure: false }
    const accessToken = data.session?.access_token
    const refreshToken = data.session?.refresh_token
    if (!accessToken || !refreshToken) {
      throw new Error('Invalid Tokens are received.')
    }
    setCookie(event, 'access_token', accessToken, cookieOptions)
    setCookie(event, 'refresh_token', refreshToken, cookieOptions)
  }
  
  event.node.res.statusCode = status
  event.node.res.end(JSON.stringify({ data: data.user?.aud, error: error }))
})
