// export default defineEventHandler(() => {
//   // 獲取文章 slug 列表來源
//   const postSlugs = ["ai", "back-end", "front-end", "others", "passocon"];
//   // 返回一個包含完整 URL 結構的陣列，每個項目應是 { loc: string, lastmod?: string, changefreq?: string, priority?: number }
//   return postSlugs.map((slug) => ({
//     // 文章路由
//     loc:
//       process.env.NODE_ENV === "production" ? `/my-blog/${slug}` : `/${slug}`,
//     // 格式化為 YYYY-MM-DD
//     lastmod: new Date().toISOString().split("T")[0],
//     changefreq: "daily",
//     priority: 0.8,
//   }));
// });

import { fileURLToPath } from "node:url";
import { globby } from "globby";
import { resolve } from "node:path";
import { stat } from "node:fs/promises";

export default defineEventHandler(async () => {
  // 獲取當前檔案的路徑
  const currentDir = fileURLToPath(new URL(".", import.meta.url));
  const contentDir = resolve(currentDir, "../../content");

  // 使用 globby 尋找所有 .md 或 .mdc 檔案
  const files = await globby("**/*.md", { cwd: contentDir });

  // 整理成 Sitemap 要求的 URL 格式
  const urls = await Promise.all(
    files.map(async (file) => {
      let loc = file
        .replace(/\.md$/, "") // 移除 .md 副檔名
        .replace(/index$/, ""); // 如果是 index.md，移除 index，讓路徑更簡潔

      // 正規表達式會匹配路徑中每個段落開頭的 "數字."
      loc = loc
        .split("/")
        .map((segment) => {
          // 如果段落是以 "數字." 開頭，就移除它
          if (/^\d+\./.test(segment)) {
            return segment.replace(/^\d+\./, "");
          }
          return segment;
        })
        .join("/");

      // 確保以斜線開頭
      if (!loc.startsWith("/")) {
        loc = `/${loc}`;
      }

      // 處理 root index
      if (loc === "/index") {
        loc = "/";
      }

      // 獲取檔案修改時間
      let lastmod;
      try {
        const filePath = resolve(contentDir, file);
        const stats = await stat(filePath);
        lastmod = stats.mtime.toISOString();
      } catch {
        lastmod = new Date().toISOString();
      }

      // 根據路徑設定優先級和更新頻率
      let priority = 0.5;
      let changefreq = "monthly";

      if (loc === "/") {
        priority = 1.0;
        changefreq = "daily";
      } else if (loc === "/intro") {
        priority = 0.9;
        changefreq = "weekly";
      } else if (loc.split("/").length <= 3) {
        // 主要分類頁面
        priority = 0.8;
        changefreq = "weekly";
      } else {
        // 具體文章頁面
        priority = 0.7;
        changefreq = "monthly";
      }

      return {
        loc: loc,
        lastmod: lastmod,
        changefreq: changefreq,
        priority: priority,
      };
    })
  );

  // 加入首頁 (如果它不在 content/index.md 中)
  if (!urls.some((u) => u.loc === "/")) {
    urls.push({
      loc: "/",
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 1.0,
    });
  }

  // 過濾重複的 URL
  const uniqueUrls = Array.from(
    new Set(urls.map((u) => JSON.stringify(u)))
  ).map((s) => JSON.parse(s));

  return uniqueUrls;
});
