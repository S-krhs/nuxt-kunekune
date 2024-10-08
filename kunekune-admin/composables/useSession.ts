export const useSession = () => {
  const session = useState<boolean>('session', () => false)
  const setSession = (session: Ref<boolean>) => (status: boolean) => session.value = status

  const redirectTo = useState<string | null>('redirectTo', () => null)
  const setRedirectTo = (redirectTo: Ref<string | null>) => (path: string) => redirectTo.value = path

  return {
    session: readonly(session),
    setSession: setSession(session),
    redirectTo: readonly(redirectTo),
    setRedirectTo: setRedirectTo(redirectTo),
  }
}