import { urlErrorPage } from "~/constants/paths"

/**
 * 通信状態を管理する
 * @returns
 *  isTransmitting: 通信中かどうか,
 *  setTransmitting: 通信ステータスの変更,
 *  asyncWithLoading: 非同期処理をラップすることで通信ステータスの変更を同時に行う
 */
export const useLoading = () => {
  const isTransmitting = useState('isTransmitting', () => false)
  const setTransmitting = (isTransmitting: Ref<boolean>) => (value: boolean) => isTransmitting.value = value

  const asyncWithLoading = (proc: (params?: any) => Promise<any>) => async (params?: any): Promise<any> => {
    isTransmitting.value = true
    const result = await proc(params)
      .catch (async (error) => {
        console.error(error)
        await navigateTo(urlErrorPage)
      })
      .finally (() => {isTransmitting.value = false})
    return result
  }  

  return {
    isTransmitting: readonly(isTransmitting),
    setTransmitting: setTransmitting(isTransmitting),
    asyncWithLoading,
  }
}

