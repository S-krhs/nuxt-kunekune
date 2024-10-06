import { useSupabase } from "../composables/useSupabase"

export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, 'access_token')
  const refreshToken = getCookie(event, 'refresh_token')

  if(!accessToken || !refreshToken){
    event.node.res.statusCode = 400
    event.node.res.end(JSON.stringify({ data: null, error: 'Tokens are undefined.' }))
    return
  }

  const { setSession } = await useSupabase()
  const { data, error, status } = await setSession(accessToken, refreshToken)

  event.node.res.statusCode = status

  const cookieOptions = { httpOnly: true, secure: false }
  setCookie(event, 'access_token', accessToken, cookieOptions)
  setCookie(event, 'refresh_token', refreshToken, cookieOptions)
  event.node.res.end(JSON.stringify({ data: data.user?.aud, error: error }))
})
