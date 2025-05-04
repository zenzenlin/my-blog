// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/content"],
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"], // 額外手動列出要預產出的頁面
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "zh-Hant-TW",
      },
      title: "zenzen 的部落格網站",
    },
    baseURL: process.env.NODE_ENV === "production" ? "/my-blog/" : "/",
  },
});
