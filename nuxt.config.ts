// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      ignore: ["/"]
   }
  }, 
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts', '@nuxt/icon', '@pinia/nuxt']
})