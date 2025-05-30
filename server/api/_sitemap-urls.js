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

// server/api/_sitemap-urls.ts
import { fileURLToPath } from "node:url";
import { globby } from "globby";
import { resolve } from "node:path";

export default defineEventHandler(async () => {
  // 獲取當前檔案的路徑
  const currentDir = fileURLToPath(new URL(".", import.meta.url));
  const contentDir = resolve(currentDir, "../../content");

  // 使用 globby 尋找所有 .md 或 .mdc 檔案
  const files = await globby("**/*.md", { cwd: contentDir });

  // 整理成 Sitemap 要求的 URL 格式
  const urls = files.map((file) => {
    let loc = file
      .replace(/\.md$/, "") // 移除 .md 副檔名
      .replace(/index$/, ""); // 如果是 index.md，移除 index，讓路徑更簡潔 (e.g., /about/index.md -> /about/)

    // 正規表達式會匹配路徑中每個段落開頭的 "數字."
    // 例如 "1.vue" -> "vue", "5.if" -> "if"
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

    // 處理 root index (如果 content/index.md 存在，對應到根目錄 /)
    if (loc === "/index") {
      loc = "/";
    }

    // 您的 GitHub Pages baseURL 設定，確保在開發和生產環境下路徑正確
    // 注意：sitemap 模組的 `site.url` 會自動處理 baseURL，這裡只需要相對路徑
    // 所以不需要 process.env.NODE_ENV === "production" 的判斷
    // 它會自動加上 site.url

    return {
      loc: loc,
      lastmod: new Date().toISOString(), // 或從檔案的修改時間讀取
      changefreq: "weekly", // 您可以根據內容更新頻率設定
      priority: loc === "/" ? 1.0 : loc.split("/").length <= 3 ? 0.8 : 0.64, // 根據路徑深度設定優先級
    };
  });

  // 加入首頁 (如果它不在 content/index.md 中) 或其他固定頁面
  urls.push({
    loc: "/",
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 1.0,
  });

  // 過濾重複的 URL (如果 globby 或手動添加導致重複)
  const uniqueUrls = Array.from(
    new Set(urls.map((u) => JSON.stringify(u)))
  ).map((s) => JSON.parse(s));

  return uniqueUrls;
});
