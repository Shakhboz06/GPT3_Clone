// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig:{
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
  }
})
