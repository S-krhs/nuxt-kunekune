import { useSupabase } from "../composables/useSupabase"

const expiresDate = new Date(0)
const cookieOptions = { httpOnly: true, secure: true, expires: expiresDate, sameSite: true }

export default defineEventHandler(async (event) => {
  try {
    const { signOut } = await useSupabase(event)

    // await new Promise(resolve => setTimeout(resolve, 1000))

    // サインアウト
    const { error, status } = await signOut()

    // サインアウト失敗
    if (error) {
      console.error('sign-out.get.ts: ', error)
      event.node.res.statusCode = status
      event.node.res.end(JSON.stringify({ data: null, error: error }))
      return
    }

    // サインアウト成功
    event.node.res.statusCode = 200
    event.node.res.end(JSON.stringify({ data: null, error: null }))

  } catch (error) {
    console.error(error)
    event.node.res.statusCode = 500
    event.node.res.end(JSON.stringify({ data: null, error: error }))
  }
})
