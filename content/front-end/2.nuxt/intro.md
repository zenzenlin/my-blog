---
title: 使用 Nuxt Content 建置部落格
description: 來記錄一下建置 Blog 時遇到的問題
date: 2025-05-05
read: '1'
authors:
  - name: Mike Lin
    username: zenzenlin
    avatar: https://www.github.com/zenzenlin.png
    to: https://github.com/zenzenlin
    target: _blank
---

## Nuxt Content

1. `pages` 跟 `content` 資料夾的 `.md` 檔無法正確匹配顯示，pages/index.vue 設置完只能顯示 content 資料夾中的根檔案，無法顯示巢狀資料夾中的檔案。

我在 `pages` 中放置 `index.vue` 和 `[...slug].vue` 用來處理 `<NuxtPage />` 進入點後的路由轉導，`index.vue` 使用了 `<ContentRenderer />` 渲染匹配的 `.md` 檔。不匹配的路徑則會進入 `[...slug].vue`。

```vue
<script setup>
const { path } = useRoute();
const { data } = await useAsyncData(() =>
  queryCollection("content").path(path).first()
);
</script>
```

這邊使用 Nuxt Content v3 的 API `queryCollection` 獲取 `content` 資料夾的內容，再對應 path 取到要顯示的 `.md` 檔。
現在事後好好想了才發現這個檔案只處理根路徑，其餘的都會進到 `[...slug].vue` 中做處理，而且在這隻檔案中我的 `queryCollection` 使用了 `.find()`，這導致了我完全找不到匹配的檔案，且由於我在 `[...slug].vue` 裡面沒有把 `<ContentRenderer />` 加上 `v-if`，導致一直在終端報錯 == Error: Cannot read properties of null (reading '_id')==，因為檔案尚未經由 `useAsyncData` 回傳。
