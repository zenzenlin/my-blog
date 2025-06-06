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
    "@nuxtjs/seo",
  ],
  components: {
    global: true,
    dirs: ["~/components"],
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
    compressPublicAssets: true,
    minify: true,
  },
  // 實驗性功能優化
  experimental: {
    payloadExtraction: false,
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
            "前端開發、Vue、Coding、自學、AI、資料分析探索，支援網頁設計與職涯轉職。",
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
        {
          name: "keywords",
          content:
            "前端開發、Vue、Nuxt、JavaScript、TypeScript、Coding、自學、AI、資料分析、職涯轉職、網頁設計",
        },
        { name: "application-name", content: "Mike's Blog" },
        { name: "apple-mobile-web-app-title", content: "Mike's Blog" },
        { name: "apple-mobile-web-app-status-bar-style", content: "default" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "msapplication-TileColor", content: "#ffffff" },
        { name: "format-detection", content: "telephone=no" },
        // Open Graph
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Mike's Blog" },
        { property: "og:locale", content: "zh_TW" },
        { property: "og:url", content: "https://zenzenlin.github.io/my-blog/" },
        { property: "og:title", content: "zenzen 的部落格網站" },
        {
          property: "og:description",
          content:
            "前端開發、Vue、Coding、自學、AI、資料分析探索，支援網頁設計與職涯轉職。",
        },
        {
          property: "og:image",
          content: "https://zenzenlin.github.io/my-blog/og-image.png",
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content: "Mike's Blog - 前端技術分享部落格",
        },
        // Twitter Cards
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@your_twitter" },
        { name: "twitter:creator", content: "@your_twitter" },
        { name: "twitter:title", content: "zenzen 的部落格網站" },
        {
          name: "twitter:description",
          content:
            "前端開發、Vue、Coding、自學、AI、資料分析探索，支援網頁設計與職涯轉職。",
        },
        {
          name: "twitter:image",
          content: "https://zenzenlin.github.io/my-blog/og-image.png",
        },
      ],
    },
    baseURL: process.env.NODE_ENV === "production" ? "/my-blog/" : "/",
  },
  site: {
    url: "https://zenzenlin.github.io",
    name: "Mike's Blog",
    description:
      "前端開發、Vue、Coding、自學、AI、資料分析探索，支援網頁設計與職涯轉職。",
    image: "https://zenzenlin.github.io/my-blog/og-image.png",
    defaultLocale: "zh-TW",
  },
  seo: {
    fallbackTitle: false,
    redirectToCanonicalSiteUrl: true,
  },
  sitemap: {
    xsl: false,
    sources: ["/api/_sitemap-urls"],
  },
  robots: {
    robotsTxt: false,
    sitemap: "https://zenzenlin.github.io/my-blog/sitemap.xml",
  },
});
