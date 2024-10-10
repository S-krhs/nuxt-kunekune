import { useSupabase } from "../composables/useSupabase"

export default defineEventHandler(async (event) => {
  try {
    const { getUser } = await useSupabase(event)

    // await new Promise(resolve => setTimeout(resolve, 1000))

    // token認証
    const { data, error, status } = await getUser()

    // 認証失敗
    if (error) {
      console.error('check-auth.post.ts: ', error)
      event.node.res.statusCode = status
      event.node.res.end(JSON.stringify({ data: null, error: error }))
      return
    }

    // 認証成功
    event.node.res.statusCode = 200
    event.node.res.end(JSON.stringify({ data: data.user?.aud, error: error, message: null }))
    
  } catch (error) {
    console.error(error)
    event.node.res.statusCode = 500
    event.node.res.end(JSON.stringify({ data: null, error: error }))
  }
})
