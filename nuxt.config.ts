// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ["shadcn-docs-nuxt"],
  compatibilityDate: "2024-07-06",

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/scripts",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
  ],
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
      link: [{ rel: "icon", type: "image/x-icon", href: "./favicon.ico" }],
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Frontend development, Vue, self-learning, focusing on AI, and data analysis exploration, supporting web design and career transition.",
        },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
        {
          name: "theme-color",
          media: "(prefers-color-scheme: light)",
          content: "white",
        },
        {
          name: "theme-color",
          media: "(prefers-color-scheme: dark)",
          content: "black",
        },
        { name: "referrer", content: "no-referrer-when-downgrade" },
        { name: "author", content: "Mike Lin" },
        { name: "keywords", content: "前端開發、Vue、Coding" },
        { name: "application-name", content: "Mike" },
        { name: "apple-mobile-web-app-title", content: "Mike" },
        { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      ],
    },
    baseURL: process.env.NODE_ENV === "production" ? "/my-blog/" : "/",
  },
  site: {
    url: "https://zenzenlin.github.io/my-blog",
    name: "Mike's Blog",
    description:
      "前端開發、Vue、Coding、自學、AI、資料分析探索，支援網頁設計與職涯轉職。",
    image: "https://zenzenlin.github.io/my-blog/og-image.png",
  },
  robots: {
    sitemap: "https://zenzenlin.github.io/sitemap.xml",
  },
  sitemap: {
    xsl: false,
    sources: ["/api/_sitemap-urls"],
  },
});
