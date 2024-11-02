import { useAuthenticatedSupabase } from '@/server/composables/useAuthenticatedSupabase'

export default defineEventHandler(async (event) => {
  try {
    const { supabase } = await useAuthenticatedSupabase(event)

    // クエリ実行
    const { data, error, status } = await supabase
      .from('pub_v_profiles')
      .select()

    // console.log(data, error, status)

    if (error) {
      console.error('test-query.ts: ', error)
      event.node.res.statusCode = status
      event.node.res.end(JSON.stringify({ data: null, error: error, message: null }))
      return
    }

    event.node.res.statusCode = 200
    event.node.res.end(JSON.stringify({ data: data[0] ?? null, error: error, message: null }))
    
  } catch (error) {
    console.error(error)
    event.node.res.statusCode = 500
    event.node.res.end(JSON.stringify({ data: null, error: error, message: null }))
  }
})
