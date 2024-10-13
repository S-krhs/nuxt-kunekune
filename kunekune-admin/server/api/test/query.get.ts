import { useSupabase } from "@/server/composables/useSupabase"

export default defineEventHandler(async (event) => {
  try {
    const { supabase, getUser } = await useSupabase(event)

    // token認証
    const { data: userData, error: userError, status: userStatus } = await getUser()

    // 認証失敗
    if (userError) {
      console.error('check-auth.post.ts: ', userError)
      event.node.res.statusCode = userStatus
      event.node.res.end(JSON.stringify({ data: null, error: userError, message: null }))
      return
    }

    // クエリ実行
    const { data, error, status } = await supabase
      .from('permissions')
      .select('permission_name')

    console.log(data, error, status)

    if (error) {
      console.error('check-auth.post.ts: ', error)
      event.node.res.statusCode = status
      event.node.res.end(JSON.stringify({ data: null, error: error, message: null }))
      return
    }

    event.node.res.statusCode = 200
    event.node.res.end(JSON.stringify({ data: data ?? null, error: error, message: null }))
    
  } catch (error) {
    console.error(error)
    event.node.res.statusCode = 500
    event.node.res.end(JSON.stringify({ data: null, error: error, message: null }))
  }
})
