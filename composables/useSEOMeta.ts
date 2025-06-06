interface SEOData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

export const useSEOMeta = (data: SEOData) => {
  const route = useRoute();
  const baseUrl = "https://zenzenlin.github.io/my-blog";

  const seoTitle = computed(() => {
    if (!data.title) return "Mike's Blog";
    return data.title === "Mike's Blog"
      ? data.title
      : `${data.title} | Mike's Blog`;
  });

  const seoDescription = computed(
    () =>
      data.description ||
      "前端開發、Vue、Coding、自學、AI、資料分析探索，支援網頁設計與職涯轉職。"
  );

  const seoImage = computed(() => data.image || `${baseUrl}/og-image.png`);

  const seoUrl = computed(() => data.url || `${baseUrl}${route.path}`);

  // 基本 meta tags
  useSeoMeta({
    title: seoTitle.value,
    description: seoDescription.value,
    ogTitle: seoTitle.value,
    ogDescription: seoDescription.value,
    ogImage: seoImage.value,
    ogUrl: seoUrl.value,
    ogType: (data.type as "website" | "article") || "website",
    ogSiteName: "Mike's Blog",
    ogLocale: "zh_TW",
    twitterCard: "summary_large_image",
    twitterTitle: seoTitle.value,
    twitterDescription: seoDescription.value,
    twitterImage: seoImage.value,
    twitterSite: "@your_twitter",
    twitterCreator: "@your_twitter",
  });

  // 文章特定的 meta tags
  if (data.article) {
    useSeoMeta({
      ogType: "article",
      articlePublishedTime: data.article.publishedTime,
      articleModifiedTime: data.article.modifiedTime,
      articleAuthor: [data.article.author || "Mike Lin"],
      articleSection: data.article.section,
      articleTag: data.article.tags,
    });
  }

  // Canonical URL
  useHead({
    link: [{ rel: "canonical", href: seoUrl.value }],
  });
};

export const useArticleSEO = (article: any) => {
  const route = useRoute();
  const baseUrl = "https://zenzenlin.github.io/my-blog";

  const publishedTime = article.date || article.createdAt;
  const modifiedTime = article.updatedAt || article.date || article.createdAt;

  useSEOMeta({
    title: article.title,
    description: article.description,
    image: article.image,
    url: `${baseUrl}${route.path}`,
    type: "article",
    article: {
      publishedTime: publishedTime
        ? new Date(publishedTime).toISOString()
        : undefined,
      modifiedTime: modifiedTime
        ? new Date(modifiedTime).toISOString()
        : undefined,
      section: article.category,
      tags: article.tags,
    },
  });

  // 注入結構化資料
  const articleSchema = useArticleSchema(article);
  useSchemaOrg([articleSchema]);

  // 注入麵包屑結構化資料
  const pathSegments = route.path.split("/").filter(Boolean);
  if (pathSegments.length > 0) {
    const breadcrumbs = pathSegments.map((segment, index) => ({
      name: segment,
      path: "/" + pathSegments.slice(0, index + 1).join("/"),
    }));
    const breadcrumbSchema = useBreadcrumbSchema(breadcrumbs);
    useSchemaOrg([breadcrumbSchema]);
  }
};
