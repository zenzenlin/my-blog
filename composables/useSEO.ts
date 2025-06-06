export const useArticleSchema = (article: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      name: "Mike Lin",
      url: "https://zenzenlin.github.io/my-blog/",
      sameAs: ["https://github.com/zenzenlin"],
    },
    publisher: {
      "@type": "Organization",
      name: "Mike's Blog",
      logo: {
        "@type": "ImageObject",
        url: "https://zenzenlin.github.io/my-blog/logo.svg",
      },
    },
    datePublished: article.date || article.createdAt,
    dateModified: article.updatedAt || article.date || article.createdAt,
    image: article.image || "https://zenzenlin.github.io/my-blog/og-image.png",
    url: `https://zenzenlin.github.io/my-blog${article._path}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://zenzenlin.github.io/my-blog${article._path}`,
    },
    keywords: article.tags?.join(", ") || "前端開發,Vue,JavaScript,程式設計",
    articleSection: article.category || "技術分享",
    wordCount:
      article.body?.children?.reduce((count: number, child: any) => {
        if (child.type === "text") return count + child.value.length;
        return count;
      }, 0) || 0,
  };
};

export const useBreadcrumbSchema = (
  breadcrumbs: Array<{ name: string; path: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `https://zenzenlin.github.io/my-blog${crumb.path}`,
    })),
  };
};

export const useWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mike's Blog",
    alternateName: "zenzen 的部落格網站",
    url: "https://zenzenlin.github.io/my-blog/",
    description:
      "前端開發、Vue、Coding、自學、AI、資料分析探索，支援網頁設計與職涯轉職。",
    publisher: {
      "@type": "Person",
      name: "Mike Lin",
    },
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://zenzenlin.github.io/my-blog/?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    inLanguage: "zh-TW",
  };
};

export const usePersonSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mike Lin",
    url: "https://zenzenlin.github.io/my-blog/",
    description:
      "前端工程師，專注於 Vue.js、JavaScript 開發，從運動員轉職為工程師的自學者",
    knowsAbout: [
      "Frontend Development",
      "Vue.js",
      "JavaScript",
      "TypeScript",
      "Nuxt.js",
      "Web Development",
    ],
    sameAs: ["https://github.com/zenzenlin"],
  };
};
