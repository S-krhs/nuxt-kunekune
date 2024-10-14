import { useSupabase } from "@/server/composables/useSupabase"

export default defineEventHandler(async (event) => {
  try {
    const { supabase } = await useSupabase(event)

    // クエリ実行
    const { data, error, status } = await supabase
      .from('profiles')
      .select(`
        tenant_id,
        profile_history_id(
          name,
          introduction,
          profile_image_id(
            url
          )
        )
      `)

    console.log(data, error, status)

    if (error) {
      console.error('test-query.ts: ', error)
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
