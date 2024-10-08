import { useSupabase } from "../composables/useSupabase"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const email = body.email
    const password = body.password
  
    const { signIn } = await useSupabase(event)
    
    // サインイン
    const { data, error, status } = await signIn(email, password)
  
    // サインイン失敗
    if (error) {
      console.error('sign-in.post.ts: ', error)
      event.node.res.statusCode = status
      event.node.res.end(JSON.stringify({ data: null, error: error }))
      return
    }
  
    // サインイン成功
    event.node.res.statusCode = 200
    event.node.res.end(JSON.stringify({ data: data.user?.aud, error: error }))

  } catch (error) {
    console.error(error)
    event.node.res.statusCode = 500
    event.node.res.end(JSON.stringify({ data: null, error: error }))
  }
})
