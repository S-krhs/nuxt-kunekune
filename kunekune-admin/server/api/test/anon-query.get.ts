import { createBrowserClient } from '@supabase/ssr'

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const supabase = createBrowserClient(
      config.supabaseUrl,
      config.supabaseAnonKey
    )

    // クエリ実行
    const { data, error, status } = await supabase
      .from('permissions')
      .select('permission_name')

    console.log(data, error, status)

    if (error) {
      console.error('test-anon-query.ts: ', error)
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
