<template>
  <div
    v-if="!page?.body"
    class="flex h-[calc(100vh-3.5rem)] items-center justify-center"
  >
    <h3 class="scroll-m-20 border-r px-4 py-3 text-2xl font-semibold">404</h3>
    <span class="scroll-m-20 px-4"> This page could not be found. </span>
  </div>

  <template v-else>
    <div
      v-if="page?.fullpage"
      class="px-4 py-6 md:px-8"
      :class="[config.main.padded && 'container']"
    >
      <ContentRenderer
        :key="page._id"
        :value="page"
        :data="(appConfig.shadcnDocs as any)?.data"
      />
    </div>
    <main
      v-else
      class="relative py-6"
      :class="[
        config.toc.enable &&
          (page.toc ?? true) &&
          'lg:grid lg:grid-cols-[1fr_220px] lg:gap-14 lg:py-8',
      ]"
    >
      <div class="mx-auto w-full min-w-0">
        <!-- SEO 麵包屑 -->
        <!-- <SEOBreadcrumb
          v-if="breadcrumbs.length > 0"
          :breadcrumbs="breadcrumbs"
        /> -->

        <LayoutBreadcrumb
          v-if="
            page?.body && config.main.breadCrumb && (page.breadcrumb ?? true)
          "
          class="mb-4"
        />
        <LayoutTitle
          v-if="config.main.showTitle"
          :title="page?.title"
          :description="page?.description"
          :badges="page?.badges"
          :authors="page?.authors"
        />

        <Alert
          v-if="page?.body?.children?.length === 0"
          title="Empty Page"
          icon="lucide:circle-x"
        >
          Start writing in
          <ProseCodeInline>content/{{ page?._file }}</ProseCodeInline> to see
          this page taking shape.
        </Alert>

        <ContentRenderer
          v-else
          :key="page._id"
          :value="page"
          :data="(appConfig.shadcnDocs as any)?.data"
          class="docs-content"
        />

        <LayoutDocsFooter />
      </div>
      <div
        v-if="config.toc.enable && (page.toc ?? true)"
        class="hidden text-sm lg:block"
      >
        <div class="sticky top-[90px] h-[calc(100vh-3.5rem)] overflow-hidden">
          <LayoutToc :is-small="false" />
        </div>
      </div>
    </main>
  </template>
</template>

<script setup lang="ts">
const { page } = useContent();
const config = useConfig();
const appConfig = useAppConfig();

// 暫時保留註解，驗證是否需要 SEO 麵包屑
// useSeoMeta({
//   title: `${page.value?.title ?? "404"} - ${config.value.site.name}`,
//   ogTitle: page.value?.title,
//   description: page.value?.description,
//   ogDescription: page.value?.description,
//   twitterCard: "summary_large_image",
// });

// SEO Meta 設定
if (page.value) {
  // 使用 composable 進行 SEO 設定
  useArticleSEO(page.value);
}

// 404 頁面的 SEO
if (!page.value?.body) {
  useSeoMeta({
    title: "404 - 頁面未找到 | Mike's Blog",
    description: "抱歉，您要找的頁面不存在。",
    robots: "noindex,nofollow",
  });
}

defineOgImageComponent((config.value.site as unknown as any).ogImageComponent, {
  title: page.value?.title,
  description: page.value?.description,
});
</script>
