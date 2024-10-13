import { devSleep } from "@/utils/develop/sleep"
import { useSupabase } from "@/server/composables/useSupabase"

export default defineEventHandler(async (event) => {
  try {
    const { signOut } = await useSupabase(event)

    // await devSleep(1000)

    // サインアウト
    const { error, status } = await signOut()

    // サインアウト失敗
    if (error) {
      console.error('sign-out.get.ts: ', error)
      event.node.res.statusCode = status
      event.node.res.end(JSON.stringify({ data: null, error: error, message: null }))
      return
    }

    // サインアウト成功
    event.node.res.statusCode = 200
    event.node.res.end(JSON.stringify({ data: null, error: null, message: null }))

  } catch (error) {
    console.error(error)
    event.node.res.statusCode = 500
    event.node.res.end(JSON.stringify({ data: null, error: error, message: null }))
  }
})
