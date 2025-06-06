#!/usr/bin/env node

/**
 * SEO 健康度檢查腳本
 * 檢查網站的 SEO 設定是否完整
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SEOHealthCheck {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.successes = [];
  }

  checkFile(filePath, description) {
    const fullPath = path.resolve(process.cwd(), filePath);
    if (fs.existsSync(fullPath)) {
      this.successes.push(`✅ ${description}: ${filePath}`);
      return true;
    } else {
      this.issues.push(`❌ ${description}: ${filePath} 不存在`);
      return false;
    }
  }

  checkFileContent(filePath, searchText, description) {
    const fullPath = path.resolve(process.cwd(), filePath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf8");
      if (content.includes(searchText)) {
        this.successes.push(`✅ ${description}`);
        return true;
      } else {
        this.issues.push(
          `❌ ${description}: 在 ${filePath} 中找不到 "${searchText}"`
        );
        return false;
      }
    } else {
      this.issues.push(`❌ ${description}: ${filePath} 不存在`);
      return false;
    }
  }

  run() {
    console.log("🔍 開始 SEO 健康度檢查...\n");

    // 檢查必要的檔案
    this.checkFile("public/_robots.txt", "Robots.txt 檔案");
    this.checkFile("nuxt.config.ts", "Nuxt 配置檔案");
    this.checkFile("composables/useSEO.ts", "SEO Composable");
    this.checkFile("composables/useSEOMeta.ts", "SEO Meta Composable");
    this.checkFile("server/routes/rss.xml.ts", "RSS Feed");
    this.checkFile("server/api/_sitemap-urls.js", "Sitemap API");

    // 檢查 Nuxt 配置
    this.checkFileContent("nuxt.config.ts", "@nuxtjs/sitemap", "Sitemap 模組");
    this.checkFileContent("nuxt.config.ts", "@nuxtjs/robots", "Robots 模組");
    this.checkFileContent("nuxt.config.ts", "@nuxtjs/seo", "SEO 模組");
    this.checkFileContent("nuxt.config.ts", "site:", "網站配置");

    // 檢查 Meta 標籤
    this.checkFileContent("nuxt.config.ts", "og:title", "Open Graph 標籤");
    this.checkFileContent("nuxt.config.ts", "twitter:card", "Twitter Cards");
    this.checkFileContent("nuxt.config.ts", "description", "Meta Description");

    // 檢查結構化資料
    this.checkFileContent("composables/useSEO.ts", "schema.org", "結構化資料");
    this.checkFileContent(
      "composables/useSEO.ts",
      "BlogPosting",
      "文章結構化資料"
    );
    this.checkFileContent(
      "composables/useSEO.ts",
      "BreadcrumbList",
      "麵包屑結構化資料"
    );

    // 檢查頁面實作
    this.checkFileContent("pages/index.vue", "useSEOMeta", "首頁 SEO 設定");
    this.checkFileContent(
      "pages/[...slug].vue",
      "useArticleSEO",
      "文章頁面 SEO 設定"
    );

    // 輸出結果
    console.log("\n📊 檢查結果:\n");

    if (this.successes.length > 0) {
      console.log("🎉 成功項目:");
      this.successes.forEach((success) => console.log(`  ${success}`));
      console.log("");
    }

    if (this.warnings.length > 0) {
      console.log("⚠️  警告項目:");
      this.warnings.forEach((warning) => console.log(`  ${warning}`));
      console.log("");
    }

    if (this.issues.length > 0) {
      console.log("🚨 需要修正的項目:");
      this.issues.forEach((issue) => console.log(`  ${issue}`));
      console.log("");
    }

    // 總結
    const total =
      this.successes.length + this.warnings.length + this.issues.length;
    const score = Math.round((this.successes.length / total) * 100);

    console.log(`📈 SEO 健康度分數: ${score}%`);

    if (score >= 90) {
      console.log("🏆 優秀！您的 SEO 設定非常完整！");
    } else if (score >= 70) {
      console.log("👍 良好！還有一些改進空間。");
    } else {
      console.log("⚠️  需要改進！建議優先修正上述問題。");
    }

    console.log("\n💡 建議:");
    console.log("  • 定期檢查 Google Search Console");
    console.log("  • 使用 Google PageSpeed Insights 檢查頁面速度");
    console.log("  • 確保所有圖片都有適當的 alt 標籤");
    console.log("  • 定期更新 sitemap 和 robots.txt");
    console.log("  • 檢查內部連結和外部連結的品質");
  }
}

// 執行檢查
const checker = new SEOHealthCheck();
checker.run();
