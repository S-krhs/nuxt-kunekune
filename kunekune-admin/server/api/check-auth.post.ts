import { useSupabase } from "../composables/useSupabase"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const accessToken = getCookie(event, 'access_token') ?? body.accessToken
  const refreshToken = getCookie(event, 'refresh_token') ?? body.refreshToken

  if(!accessToken || !refreshToken){
    console.error('check-auth.post.ts: Tokens are undefined.')
    event.node.res.statusCode = 400
    event.node.res.end(JSON.stringify({ data: null, error: 'Parameters Error: Tokens are undefined.' }))
    return
  }

  const { setSession } = await useSupabase()
  const { data, error, status } = await setSession(accessToken, refreshToken)
  if (error) {
    console.error('check-auth.post.ts: ', error)
    event.node.res.statusCode = status
    event.node.res.end(JSON.stringify({ data: null, error: error }))
    return
  }

  event.node.res.statusCode = 200

  const cookieOptions = { httpOnly: true, secure: false }
  setCookie(event, 'access_token', accessToken, cookieOptions)
  setCookie(event, 'refresh_token', refreshToken, cookieOptions)
  event.node.res.end(JSON.stringify({ data: data.user?.aud, error: error }))
})
