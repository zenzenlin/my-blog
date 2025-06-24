<template>
  <div class="px-4 py-6 md:px-8" :class="[config.main.padded && 'container']">
    <ContentRenderer
      :key="page._id"
      :value="page"
      :data="(appConfig.shadcnDocs as any)?.data"
    />
  </div>
</template>

<script setup lang="ts">
const { page } = useContent();
const config = useConfig();
const appConfig = useAppConfig();

// 首頁 SEO 設定
useSEOMeta({
  title: "Mike's Blog",
  description: "前端開發、Vue、Coding、自學、AI 探索，支援網頁設計與職涯轉職。",
  image: "https://my-blog-taupe-one.vercel.app/my-blog/og-image.png",
  url: "https://my-blog-taupe-one.vercel.app/my-blog/",
  type: "website",
});

// 注入網站和個人結構化資料
const websiteSchema = useWebsiteSchema();
const personSchema = usePersonSchema();
useSchemaOrg([websiteSchema, personSchema]);

// 額外的 head 設定
useHead({
  link: [
    {
      rel: "alternate",
      type: "application/rss+xml",
      title: "RSS Feed",
      href: "https://my-blog-taupe-one.vercel.app/my-blog/rss.xml",
    },
  ],
});
</script>
