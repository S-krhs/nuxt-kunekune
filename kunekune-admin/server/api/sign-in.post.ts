import { useSupabase } from "../composables/useSupabase"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = body.email
  const password = body.password

  const issuedAccessToken = getCookie(event, 'access_token')
  const issuedRefreshToken = getCookie(event, 'refresh_token')
  
  const cookieOptions = { httpOnly: true, secure: false }

  const { signIn, setSession } = await useSupabase()

  if(issuedAccessToken && issuedRefreshToken){
    const { data, error, status } = await setSession(issuedAccessToken, issuedRefreshToken)
    if (error) { console.log('The token has expired. Reissue the token.') }
    if (status === 200) {
      event.node.res.statusCode = status
      setCookie(event, 'access_token', issuedAccessToken, cookieOptions)
      setCookie(event, 'refresh_token', issuedRefreshToken, cookieOptions)
      event.node.res.end(JSON.stringify({ data: data.user?.aud, error: error }))
      return
    }
  }
  
  const { data, error, status } = await signIn(email, password)
  if (error) {
    console.error('sign-in.post.ts: ', error)
    event.node.res.statusCode = status
    event.node.res.end(JSON.stringify({ data: null, error: error }))
    return
  }

  const accessToken = data.session?.access_token
  const refreshToken = data.session?.refresh_token
  if (!accessToken || !refreshToken) {
    throw('Invalid token is received.')
  }
  setCookie(event, 'access_token', accessToken, cookieOptions)
  setCookie(event, 'refresh_token', refreshToken, cookieOptions)

  event.node.res.end(JSON.stringify({ data: data.user?.aud, error: error }))
})
