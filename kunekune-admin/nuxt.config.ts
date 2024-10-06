// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    basicAuthRequire: '',
    basicAuthUser: '',
    basicAuthPassword: '',
    supabaseUrl: '',
    supabaseAnonKey: '',
  },
  app: {
    cdnURL: '',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
    },
  }
})
