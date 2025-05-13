---
title: Vue 介紹
description: Vue.js 的基本介紹
icon: 'lucide:ambulance'
gitTalk: true
breadcrumb: false
date: 2025-05-01
read: '1'
authors:
  - name: Mike Lin
    username: zenzenlin
    avatar: https://www.github.com/zenzenlin.png
    to: https://github.com/zenzenlin
    target: _blank
---

## 一個優秀的 JavaScript 框架

➤ 過去只有 Javascript、HTML、CSS 時有什麼問題？

難以維護：專案結構龐大時 Javascript、HTML、CSS 維護難度會成幾何式上升，各式各樣的邏輯都集中在 Javascript 裡面導致程式可讀性極低
效能低落：如果 Javascript 頻繁操作 DOM 元素時會不斷觸發 Reflow & Repaint 的流程，頁面重複渲染的過程會消耗大量效能

➤ 框架的優勢

資料與 UI 分離：過去 Javascript 要動態的去更新 DOM 來塞入資料，但框架透過資料雙向綁定，工程師可以專注處理資料的邏輯面
模組化的 UI：一個網站會有許多重複出現的元素(按鈕、表單、表格…)，在框架中可以這些常用的元素設計成 component，要使用時再根據實際需求填入資料及參數即可，大幅提升工程師理解與維護的能力。
更好的效能：採取 Virtual DOM 概念，當資料變動時先計算好要變動的地方，以此抵銷無意義的變更，並且重複使用已存在的 DOM 元素

## Vue 是

Vue (發音類似 view) 是一個用來方便打造前端畫面的 JavaScript 框架。提供了一系列高度整合封裝的 API，幫助我們高效地開發前端界面。

下面是一個基本的範例：

::code-group

  ```js [app.js]
  import { createApp, ref } from 'vue'

  createApp({
    setup() {
      return {
        count: ref(0)
      }
    }
  }).mount('#app')
  ```

  ```vue [Usage]
  <template>
    <div class="demo bg-emerald-400 p-4 rounded-lg">
      <button
        class="bg-emerald-700 text-white px-2 py-1 rounded-lg"
        @click="count++"
      >
        Count is: {{ count }}
      </button>
    </div>
  </template>
  ```

  :::preview-card{icon="i-lucide-eye" label="Preview"}
    ::::DemoTest
    ::::
  :::

::

上面的例子展示了 Vue 的兩個核心功能：

- **聲明式渲染**：Vue 擁有自己的一套模板語法，我們可以聲明式地描述最終輸出的 HTML 和 JavaScript 狀態之間的關係。

- **響應式**：Vue 會自動跟蹤 JavaScript 狀態並在其發生變化時響應式地更新 DOM。

::alert{type="success" icon="lucide:info"}
  An **info** alert with `code` and a [link](/).
::
