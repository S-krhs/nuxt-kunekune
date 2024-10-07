import { useSupabase } from "../composables/useSupabase"

export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, 'access_token')
  const refreshToken = getCookie(event, 'refresh_token')

  const expiresDate = new Date(0)
  const cookieOptions = { httpOnly: true, secure: false, expires: expiresDate }

  if(!accessToken || !refreshToken){
    event.node.res.statusCode = 200
    setCookie(event, 'access_token', '', cookieOptions)
    setCookie(event, 'refresh_token', '', cookieOptions)
    event.node.res.end(JSON.stringify({ data: null, error: null }))
    return
  }

  const { signOut } = await useSupabase()
  const { error, status } = await signOut()
  if (error) {
    console.error('sign-out.get.ts: ', error)
    event.node.res.statusCode = status
    event.node.res.end(JSON.stringify({ data: null, error: error }))
    return
  }

  event.node.res.statusCode = 200
  setCookie(event, 'access_token', '', cookieOptions)
  setCookie(event, 'refresh_token', '', cookieOptions)
  event.node.res.end(JSON.stringify({ data: null, error: error }))
})
