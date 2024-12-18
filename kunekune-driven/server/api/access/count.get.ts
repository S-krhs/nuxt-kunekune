import { useAuthenticatedSupabase } from '@/server/composables/useAuthenticatedSupabase'

export default defineEventHandler(async (event) => {
  try {
    const { supabase } = await useAuthenticatedSupabase(event)

    // クエリ実行
    const { data, error, status } = await supabase
      .from('access_counts')
      .select()

    if (error) {
      console.error('test-query.ts: ', error)
      event.node.res.statusCode = status
      event.node.res.end(JSON.stringify({ data: null, error: error, message: null }))
      return
    }

    // 旧サイトにアクセスした場合のアクセスカウンタ対策でしばらくログアウトを追加
    // await supabase.auth.signOut()

    event.node.res.statusCode = 200
    event.node.res.end(JSON.stringify({ data: data[0]?.access_count ?? 99999999, error: error, message: null }))
    
  } catch (error) {
    console.error(error)
    event.node.res.statusCode = 500
    event.node.res.end(JSON.stringify({ data: null, error: error, message: null }))
  }
})
