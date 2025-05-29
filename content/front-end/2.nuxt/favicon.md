---
title: favicon 不顯示
description: 來記錄一下部署至 GitHub Pages 時遇到的 favicon 問題
date: 2025-05-30
read: '1'
# icon: noto:construction
authors:
  - name: Mike Lin
    username: zenzenlin
    avatar: https://www.github.com/zenzenlin.png
    to: https://github.com/zenzenlin
    target: _blank
---

## 無法顯示 favicon

目前部落格都是使用 GitHub Pages 部署，在線上卻沒有出現 favicon，之前都忘記要調整，由於我是用 Nuxt3 搭建，今天弄了一下發現該設定的都有設定，具體來說如下：

```ts{4}
// nuxt.config.ts
head: {
  ...
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
},
```

本地當然沒問題，然後照理說，有了這項設定線上應該就會顯示了，但部署完成後還是只看到地球...？因此找出幾點：

- `type="image/svg+xml"`: 我的 favicon.ico 不是 svg 檔，應該不用這個設定
- 快取問題: 瀏覽器強制清空快取，還是不行
- 檔案路徑: 由於本地都沒問題，自然以為是沒打包進去，但檔案是有的，而且可以透過 https://zenzenlin.github.io/my-blog/favicon.ico 造訪到，不過透過 https://zenzenlin.github.io/favicon.ico 就是 404 了，因此問題極有可能出在這。GitHub Pages 將我的網站放在以 repo 為名的子路徑下，因此原本的設定等於去找 https://zenzenlin.github.io/favicon.ico 這個資源，自然找不到了，因此改成 `href: "./favicon.ico"` 表示在當前 HTML 檔案的相同目錄下尋找。

## 參考

[Can't seem to add a favicon #16727](https://github.com/nuxt/nuxt/discussions/16727)
