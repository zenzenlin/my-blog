// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ["shadcn-docs-nuxt"],
  compatibilityDate: "2024-07-06",

  modules: ["@nuxt/content", "@nuxt/eslint", "@nuxt/icon", "@nuxt/scripts"],
  components: {
    global: true,
    dirs: ["~/components"],
  },
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
