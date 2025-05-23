---
title: 如何做出更好的架構決策
description: 講述如何做出更好的架構決策
date: 2025-05-21
read: '1'
authors:
  - name: Mike Lin
    username: zenzenlin
    avatar: https://www.github.com/zenzenlin.png
    to: https://github.com/zenzenlin
    target: _blank
---

看到一篇文章，講述如何做出更好的架構決策，本文參考自《[How I Make Better Architectural Decisions as a Senior Developer](https://medium.com/@vndpal/how-i-make-better-architectural-decisions-as-a-senior-developer-09ab94e0715f)》，看完想針對大部分進行翻譯紀錄，並加入自己的話，以下為個人翻譯與觀點整理。

## 架構始於清晰

> 明確定義的問題可以帶來更好的架構決策

1. 「為什麼」？

    當有人說「我們需要微服務」時，我不僅僅是同意。我一次又一次地問為什麼，直到我明白了真正的原因。也許是關於擴展、團隊需求或更快的更新。我**不斷地問為什麼，直到答案清楚為止**。
2. 定義約束

    效能、可擴展性、團隊技能、預算——這些塑造了架構。
3. 與利害關係人交談

    其中包括產品、業務和營運團隊。他們可以發現隱藏的需求。例如，這些可能包括合規規則、成本問題或痛點。
4. 明確核心用例

    我第一天設計時不會考慮極端情況。我專注於系統需要出色完成的主要任務。**試圖做到一切的建築最終什麼都做不好**。
5. 寫在一張紙上

    不俗套！它確實有效。如果我不能用一頁清楚的文字解釋問題和限制，那麼我就沒有充分理解它。**如果紙面上的內容模糊不清，生產時就會一片混亂**。

## 購買與構建

您的公司正在為企業用戶推出一款行動應用程式。它需要強大的安全功能：包括多因素身份驗證 (MFA)、生物識別登入和企業單一登入 (SSO)。以下是考慮的選項：

- A. 在內部建立身分驗證服務以確保完全控制
- B. 使用第三方身分驗證供應商，如 Auth0 或 AWS Cognito。這有助於您更快地啟動並滿足安全標準

正確實施安全性是一項挑戰。在這種情況下，考慮到合規性要求和功能集，我會選擇第三方提供者。

這些服務提供久經考驗的安全性、內建合規性和持續更新。建立內部身分驗證需要花費大量的時間和金錢。它需要安全專家、審計和持續維護。這可能會分散您的團隊對核心產品的注意力。

考慮到這種情況，就沒有必要再重新發明輪子了。使用已經建置、測試且安全的可信任服務是更明智的做法。

## 單體架構 vs. 微服務

您的新創公司正在建立 SaaS 平台並努力尋找適合市場的產品，該平台具有用戶管理、計費和通知等多種相關功能。

您需要快速行動，同時也為未來的可擴展性做好準備，於是在選擇架構上出現兩種討論：

- A. 從單體模組化架構開始，但要保持清晰、模組化的方式，以便您以後可以輕鬆地將它們分開
- B. 從第一天開始全面採用微服務，讓每個部分自行擴展和部署，但它也在早期增加了複雜性

微服務聽起來可能很令人興奮，但我更喜歡從單體模組化架構開始。它支援快速開發並使除錯更容易。採用這種方法，部署和維護也更簡單。由於加快步伐是我們的主要目標，而且我們尚未找到適合的產品市場，因此 Monolith 是我們的最佳選擇。一旦明確需要擴展，我們就可以開始將特定部分提取為微服務。這使得事情在早期變得簡單，並在後期變得靈活。

Instagram、Facebook 和亞馬遜等大公司都是從單體架構開始的。他們一開始將事情保持簡單，然後在需要時擴展。過早使用微服務會增加額外的複雜性。你必須處理分散式事務和服務到服務通訊等事務。最好等到產品與市場的契合度明確後再做決定。

## 結尾

架構選擇具有持久的影響，學會做出正確的權衡需要時間和經驗。

好的架構不代表第一次就是完美的，它是關於基於了解、彈性和有目的地做出選擇。最好的建築師不斷進步，他們學習、嘗試新事物並樂於接受改變。

## 參考

[How I Make Better Architectural Decisions as a Senior Developer](https://medium.com/@vndpal/how-i-make-better-architectural-decisions-as-a-senior-developer-09ab94e0715f)

⚠️ 本文內容為個人翻譯筆記與心得整理，原文所有內容版權歸原作者所有，如有侵權請告知，我將立即處理。
