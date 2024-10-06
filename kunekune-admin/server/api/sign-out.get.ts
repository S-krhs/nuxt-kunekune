import { useSupabase } from "../composables/useSupabase"

export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, 'access_token')
  const refreshToken = getCookie(event, 'refresh_token')

  if(!accessToken || !refreshToken){
    event.node.res.statusCode = 200
    event.node.res.end(JSON.stringify({ data: null, error: null }))
    return
  }

  const { signOut } = await useSupabase()
  const { error, status } = await signOut()

  event.node.res.statusCode = status
  const expiresDate = new Date(0)
  const cookieOptions = { httpOnly: true, secure: false, expires: expiresDate }
  setCookie(event, 'access_token', '', cookieOptions)
  setCookie(event, 'refresh_token', '', cookieOptions)
  event.node.res.end(JSON.stringify({ data: null, error: error }))
})
