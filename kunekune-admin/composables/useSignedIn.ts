/**
 * 直近で確定したサインイン状態を管理
 * @returns 
 *  isSignedIn: サインインしているかどうか,
 *  setSignedIn: サインインステータスの変更
 */
export const useSession = () => {
  const isSignedIn = useState<boolean>('isSignedIn', () => false)
  const setSignedIn = (isSignedIn: Ref<boolean>) => (value: boolean) => isSignedIn.value = value

  return {
    isSignedIn: readonly(isSignedIn),
    setSignedIn: setSignedIn(isSignedIn),
  }
}