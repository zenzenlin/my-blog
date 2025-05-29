---
title: Nuxt3
description: Nuxt 3：為 Vue.js 打造的全端應用框架
date: 2025-05-29
read: '1'
# icon: noto:construction
authors:
  - name: Mike Lin
    username: zenzenlin
    avatar: https://www.github.com/zenzenlin.png
    to: https://github.com/zenzenlin
    target: _blank
---

## Nuxt3 是

> Vue.js 開發者的最佳利器

作為 Vue.js 的應用框架，Nuxt 3 徹底簡化了開發流程。它將過去繁瑣的 Webpack、Vue Loader、Vuex 和 Vue Router 等配置集中管理，大幅降低了開發者的學習與配置成本，讓您能更專注於業務邏輯的實作。

## 多元渲染模式

> 兼顧效能、SEO 與使用者體驗

Nuxt 3 在渲染模式上提供了極大的彈性，讓您能針對不同的專案需求選擇最適合的方案：

### 伺服器端渲染 (SSR)：SEO 優化與首屏加速的秘密武器

Nuxt 3 預設採用伺服器端渲染 (**Server-Side Rendering, SSR**)，也被稱為「通用渲染 (**Universal Rendering**)」或「同構渲染 (**Isomorphic Rendering**)」。其運作原理是：Node.js 伺服器會將基於 Vue 的元件預先渲染成 HTML 內容，再傳輸到客戶端。與傳統的 Vue SPA 相比，使用 SSR 將帶來：

- **優化 SEO**：由於伺服器端已經生成了完整的 HTML 結構，Google 等搜尋引擎的爬蟲能更好地解析 DOM 元素，顯著提升網站的 SEO 排名
- **更快的首屏載入時間**：使用者在瀏覽器中收到的是一個已渲染好的 HTML 頁面，而不是純粹的 JavaScript，因此頁面能夠更快地呈現在使用者眼前
- **降低客戶端負擔**：減少了客戶端需要下載和執行的 JavaScript 數量，對於低階設備或網路環境不佳的使用者而言，能帶來更流暢的體驗
- **方便快取**：頁面可以在伺服器端進行快取，進一步提升效能

#### 前後端「同構」與「Hydration」機制

Nuxt 3 的通用渲染模式，巧妙地結合了 SSR 與 CSR (Client-Side Rendering) 的優點。當 Nuxt 伺服器收到網頁請求時，會先渲染出 HTML 回傳給瀏覽器顯示靜態頁面，同時開始載入所需的 Vue 程式碼。一旦客戶端程式碼載入完成，便會接管頁面的互動性，將渲染行為轉移至客戶端進行，這就是所謂的「Hydration」。

- **Hydration**：指在瀏覽器中，使後端渲染出的靜態頁面具有交互性的過程。在 Hydration 完成前，網頁雖然能瀏覽但尚未具備互動性。完成後，Vue 元件會重新載入並綁定，使頁面完全可互動
- **響應式變數的最佳實踐**：為了確保 Hydration 前後的初始值得以保留，建議多使用 Nuxt 提供的 `useState` 來替代 `ref`，且 `useState` 還能透過 `key` 讓狀態在元件間共享

### 靜態網站生成 (Static Site Generation, SSG / Prerender)：輕量且高效的選擇

Nuxt 3 也支援生成靜態網站 (Static Site Generation, SSG)，這也被稱為 JAMStack 的一種應用。

- **「兩全其美」的優勢**：您不需要伺服器，但仍能獲得 SSR 帶來的 SEO 好處。這是因為 Nuxt 會預先渲染所有頁面並包含必要的 HTML
- **部署簡單**：生成的靜態頁面可以輕鬆部署到 Netlify、GitHub Pages 等靜態網站託管服務上

### 單頁應用程式 (SPA)：傳統但彈性的開發模式

即使不需要 SSR 或靜態網站生成，Nuxt 3 依然能以傳統的 SPA (Single Page Application) 模式運行。

- **輕量啟動**：適合慢慢轉換應用程式或希望輕量起步的專案
- **熟悉的開發體驗**：最終您將獲得一個熟悉的 Vue SPA，但會受益於 Nuxt 配置和框架本身的優化

### 其他進階渲染模式

Nuxt 3 還提供了更細緻的渲染控制：

- **SSR (預設)**：後端渲染完成後發送給前端
- **ISR (Incremental Static Regeneration)**：漸進式靜態生成，第一次渲染後快取，並在指定時間重新渲染更新
- **SWR (Stale-While-Revalidate)**：快取並在指定時間清除快取
- **Prerender (生成靜態頁面)**：預先生成 HTML 檔案

## 高效能與開發體驗：Nuxt 3 的智慧優化

Nuxt 3 在開發體驗和應用效能上投入了大量心力，讓您的應用程式天生高效。

### 自動化與約定優於配置 (Convention over Configuration)

- **基於檔案的路由 (File-based routing)**：根據 `pages/` 目錄的結構自動定義路由，大幅減少手動配置的時間
- **程式碼分割 (Code splitting)**：Nuxt 自動將您的程式碼分割成更小的區塊，提升載入速度
- **開箱即用的伺服器端渲染 (Server-side rendering out of the box)**：Nuxt 內建 SSR 能力，無需額外配置
- **自動引入 (Auto-imports)**：在指定的目錄（如 composables 和 components）中撰寫 Vue 組合式函數和元件，無需手動引入即可直接使用，讓程式碼更簡潔
- **預配置的建置工具 (Configured build tools)**：預設使用 Vite，支援熱模組替換 (HMR)，加速開發流程，並為生產環境優化程式碼

### Nitro 引擎：驅動 Nuxt 3 的核心

Nuxt 3 內建的 Nitro 引擎是其高效能的關鍵。它負責通用渲染、API 路由、程式碼分割等核心功能，並支援將應用程式部署到多種環境，例如：無伺服器函式 (Serverless Functions)、邊緣運算 (Edge Computing) 等。

渲染函數由邊緣計算負責：透過 Nitro，渲染任務可以由邊緣計算負責，帶來更快的響應速度。

### 最佳化技術

Nuxt 3 預設會最佳化您的應用程式：

- **程式碼瘦身**：盡可能地剔除所有不必要的程式碼
- **內聯 CSS (Inline CSS)**：將 CSS 內聯到 HTML 中，減少 HTTP 請求，提升網頁打開速度
- **預加載與預緩存**：利用 `modulepreload` 預加載模組，`prefetch` 預加載文件等技術，加速資源載入
- **豐富的分析器**：內建一組分析器，幫助您更好地優化應用程式

## 強大的模組化生態系 (Modules)

Nuxt 3 擁有一個強大的模組化架構，提供超過 50 個模組供您選擇，讓開發更快速、更簡單。

- **擴充性**：模組是非同步函數，可以依序運行，並能覆寫模板、配置 Webpack Loader、添加 CSS 函式庫等
- **開箱即用**：支援 PWA、添加 Google 分析、生成網站地圖等功能，無需「重新發明輪子」
- **共享與重複利用**：Nuxt 模組可以打包成 npm 套件，方便在不同專案中重複使用，並與社群共享，共同建立高品質的附加元件生態系

## 數據管理與配置：讓應用更靈活

### 資料獲取 API (Data Fetching API)

Nuxt 3 提供了專為資料獲取優化的 API，例如 `useFetch` 和 `useAsyncData`。

- **高效資料傳遞與狀態管理**：這些 API 基於 `useFetch` 封裝，提供更豐富的資料載入和處理能力。在後端完成資料載入後，會將資料帶至前端，前端無需再發送額外的請求，實現前後端同構下的高效頁面渲染
- **頁面切換不重新載入**：Nuxt 會將讀取到的資料暫存在其控制的空間內，然後在創建的 Vue 應用中讀取這些數據，從而實現頁面切換時的無感加載

### 環境變數與應用配置 (Runtime Config & App Config)

Nuxt 3 提供了兩種方式來管理環境變數和前端共用設定，讓應用程式更具彈性：

- Runtime Config (執行時配置)：
  - 主要用於載入專案 `.env` 檔案中的變數到 Node.js 的 `process.env` 中
  - 適用於不能公開或敏感的 Key 和設定值，例如資料庫帳號密碼、第三方服務 Token 或 API Key 等
  這些配置通常只在伺服器端讀取和使用，不會洩漏給使用者，因此稱為執行時的配置。
- App Config (應用程式配置)：
  - 提供給整個 Nuxt App 使用的響應式配置，並且可以在生命週期中更新
  - 適用於可以公開的配置，例如網站主題的主色等
  - 可以透過兩種方式設定：
    1. 在 `defineNuxtConfig` 中設置 `appConfig` 屬性物件
    2. 建立 `app.config.ts` 檔案。如果該檔案與 `nuxt.config.ts` 中的 `appConfig` 屬性具有相同的命名，則以 `app.config.ts` 檔案內的設置為主
