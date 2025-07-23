---
title: 別錯誤地使用了 AI
description: 講述如何正確地使用 AI 幫助到我們
date: 2025-07-23
read: '1'
authors:
  - name: Mike Lin
    username: zenzenlin
    avatar: https://www.github.com/zenzenlin.png
    to: https://github.com/zenzenlin
    target: _blank
---

看到一篇文章，講述絕大多數的開發者都錯誤地使用了 Claude（以及如何成為那 1%），本文參考自《[99% of Developers are Using Claude Wrong (How to Be The 1%)](https://medium.com/@alexjamesdunlop/9abfec9cb178)》，看完想針對大部分進行翻譯紀錄，並加入自己的話，以下為個人翻譯與觀點整理。

## 前言

八個月以來，我把 Claude 當作搜尋引擎一樣使用。問一些基本的問題，得到一些基本的回覆，我總覺得沒有充分發揮它的潛力。

::alert{type="success" icon="lucide:lightbulb"}
  我發現了使用 Claude 的方法，所以現在感覺就像我正在與 Google 的工程團隊合作進行快速撥號。
::

## 為什麼大多數人都錯誤地使用了 Claude

大多數人把 Claude 當成 Google search 或 Reddit 問答。他們打開一個新的聊天，得到答案，然後繼續下一步。這就像是僱人幫你 Google search，然後對搜索結果不做任何處理。

例如：

- 「如何將 div 居中？」
- 「最好的 React 狀態管理庫是什麼？」
- 「修復此錯誤：...」

> 這些例子將 Claude 視為一個沒有上下文的搜尋引擎，只是隨機提問，希望得到神奇的答案。

::alert{type="danger" icon="lucide:circle-x"}
  上下文缺失的問題：你不會要求同事測試程式碼，卻不解釋自己在做什麼、嘗試過什麼，或需求是什麼。然而，人們就是這麼使用 Claude 的。
::

95% 的用戶從未點擊過設定選單。他們不了解網頁搜尋、Gmail 整合、文件上傳，以及不同的對話風格。**他們就像開著戰鬥機在路上行駛一樣。**

## 我做錯了什麼（為什麼這很重要）

八個月以來，我一直有這些使用問題：

- 我會問 Claude：「我應該如何實現 AWS 身份驗證？」，然後得到一些通用的 JWT 教學，但根本不適合我的場景

- 我會直接貼上瀏覽器控制台的錯誤訊息，卻不解釋任何上下文

- 我會創建一個對話，然後就離開，而不會將這些輸出作為其他問題的良好背景資訊

**結果是**：很多時候，它的感覺並不比 Stack Overflow 好。**為什麼這很重要**：錯誤的輸入會產生錯誤的輸出，當你向 Claude 簡要介紹時，你會得到錯誤的答案。

## 讓我的產出增加 10 倍的發現

- 我正在測試一個 React 問題，截止日期迫在眉睫。
- 我厭倦了每次問「修復這個錯誤」的時候，它都默認我正在使用 NextJS。
- 我上傳了整個元件、錯誤 logs、`package.json` 和專案需求。然後我寫道：**「你現在是我的資深 React 合作夥伴了，我上傳了一些問題，解釋了為什麼我遇到這個問題。請仔細考慮一下，在回復解決方案之前，先問我一些問題，以便更好地了解如何解決問題。」**

**發生了什麼事**：Claude 在 2 分鐘內修復了 bug，找到了架構改進，並交付了一次就完美運行的程式碼。而我以前需要花 1 小時來回溝通才能搞定這一切。

::alert{type="success" icon="lucide:lightbulb"}
  這讓我意識到 Claude 不是搜尋引擎，它需要適當的介紹。
::

**重複使用過去的對話**：如果您喜歡結果，那麼說「我喜歡這些結果，您能否提示我在未來實現這一目標」。

## 語境革命：如何像高級開發人員一樣進行簡報

### Level 1 - Use Templates

```text
  PROJECT CONTEXT:
  - What I'm building: [Specific description]
  - Tech stack: [Exact versions]
  - User base: [Who uses this]
  - Timeline: [Deadlines and constraints]

  CURRENT SITUATION:
  - What I'm trying to achieve: [Specific goal]
  - What I've already tried: [Previous attempts]
  - What's blocking me: [Specific problem]
  - Success criteria: [What good looks like]

  Now help me [specific request].
```

### Level 2 - Use Prompts from previous conversations

```text
  我喜歡這些結果，你能提示我以後能達成這個目標嗎
```

### Level 3 - Update your Profile

![Update your Profile](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*wYWx731QUmibNXLPmguxBQ.png)

### Level 4 - Use Projects

![Use Projects](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*UmNUf-RBqgV4K0jO0fRPeg.png)

## 我的企業成果提示框架

SCALE Framework

- S — Situation: 目前專案背景和限制
- C — Context: 技術堆疊、業務需求、團隊結構
- A — Audience: 誰使用這個，誰維護這個
- L — Limitations: 我們不能做什麼，預算或時間限制
- E — Expected Outcome: 成功的樣子是什麼

## 參考

[99% of Developers are Using Claude Wrong (How to Be The 1%)](https://medium.com/@alexjamesdunlop/9abfec9cb178)

⚠️ 本文內容為個人翻譯筆記與心得整理，原文所有內容版權歸原作者所有，如有侵權請告知，我將立即處理。
