export const devSleep = async (ms: number) => {
  const config = useRuntimeConfig()
  if (config.public.environmentName === 'dev'){
    await new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const sleep = async (ms: number) => {
  await new Promise(resolve => setTimeout(resolve, ms))
}