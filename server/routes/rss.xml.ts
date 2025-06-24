export default defineEventHandler(async (event) => {
  const { serverQueryContent } = await import("#content/server");

  setHeader(event, "content-type", "application/rss+xml; charset=UTF-8");

  try {
    // 獲取所有文章
    const articles = await serverQueryContent(event)
      .where({ _partial: false })
      .sort({ date: -1, _file: -1 })
      .limit(50)
      .find();

    const baseUrl = "https://my-blog-taupe-one.vercel.app/my-blog";

    const rssItems = articles
      .filter(
        (article) => article._path !== "/index" && article._path !== "/intro"
      )
      .map((article) => {
        const url = `${baseUrl}${article._path}`;
        const date = new Date(article.date || article.createdAt || Date.now());

        return `
    <item>
      <title><![CDATA[${article.title || "Untitled"}]]></title>
      <description><![CDATA[${
        article.description || article.title || "No description"
      }]]></description>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${date.toUTCString()}</pubDate>
      <author>mike@example.com (Mike Lin)</author>
      ${
        article.tags
          ? article.tags
              .map((tag: string) => `<category><![CDATA[${tag}]]></category>`)
              .join("\n      ")
          : ""
      }
    </item>`;
      })
      .join("");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[Mike's Blog]]></title>
    <description><![CDATA[前端開發、Vue、Coding、自學、AI 探索，支援網頁設計與職涯轉職。]]></description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>zh-tw</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Nuxt 3</generator>
    <webMaster>mike@example.com (Mike Lin)</webMaster>
    <managingEditor>mike@example.com (Mike Lin)</managingEditor>
    <copyright>Copyright ${new Date().getFullYear()} Mike Lin</copyright>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/logo.svg</url>
      <title>Mike's Blog</title>
      <link>${baseUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>${rssItems}
  </channel>
</rss>`;

    return rss;
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error generating RSS feed",
    });
  }
});
