---
title: MCP 介紹
description: 什麼是 MCP？
date: 2025-05-20
read: '1'
authors:
  - name: Mike Lin
    username: zenzenlin
    avatar: https://www.github.com/zenzenlin.png
    to: https://github.com/zenzenlin
    target: _blank
---

## MCP 是什麼？

> 是一種開放協定，提供一種標準化的方式，讓 AI 向外部工具請求使用服務和數據，就像 USB-C 轉接頭一樣

Model Context Protocol（MCP）是由 Anthropic 在 2024 年底推出的開放標準，它徹底改變了 AI 如何與「外部世界」互動的方式。你可以把它視為「AI 應用程式的 USB-C 接口」一種**通用的連接方式**，讓 AI 模型能安全、標準化地**存取外部即時資料與工具**。

### MCP 的起源

Anthropic（Claude 的開發公司）為了解決 AI 缺乏即時資訊與工具互動的需求，從零開始設計了 MCP 並開放原始碼，鼓勵業界廣泛採用與參與開發。

## MCP 的架構

#### 1. MCP 主機

  MCP 主機是需要存取外部工具的 **AI 應用本身**——例如：整合到開發環境中的 AI 助理或獨立的 AI 工具，這些主機發起向外部系統請求資訊或行動。

#### 2. MCP 客戶端

  MCP 客戶端在主機應用程序中**作為中介橋樑**。它們與 MCP 伺服器採專用的一對一連接，負責：
   - 將來自主機的請求轉發到適當的伺服器
   - 將伺服器的回應傳回主機
   - 確保通訊渠道的安全性

#### 3. MCP 伺服器

  MCP 伺服器是**向 AI 系統公開特定功能的輕量級程式**。比如：Slack、Gmail、Google日曆、Mac 檔案系統等，提供 AI 所需的功能與數據，MCP 伺服器可以是遠端應用程式或本地數據來源。就像滑鼠、鍵盤、硬碟等各種 USB 設備，透過轉接頭連接到筆電。它們：
   - 連接到地端或遠端資料源（文件系統、數據庫、API）
   - 向 MCP 主機公開其功能
   - 處理請求並回報相關信息

## MCP 的實際應用

舉例來說，使用者向 ChatGPT 提出請求：「**幫我找出這週與總經理的會議紀錄，並寄送摘要。**」

AI 分析請求後，發現需要存取日曆數據、產生會議摘要和發送 Gmail，便會透過 MCP 客戶端發送請求到 MCP 伺服端，請求使用「日曆存取」與「郵件發送」這兩種功能。過程中 ChatGPT 不用直接對接 Google 的 API，而是統一透過 MCP 來取得數據。

## 通用標準的實現？

目前 MCP 市場仍由 Anthropic 主導，要讓 MCP 成為普遍通用的標準，還需要主要的模型供應商都跟進採用。只是包含 OpenAI、Google、AWS 和 Meta 等公司，都尚未針對 MCP 給予標準化的承諾，和 AI 模型一樣，未來也可能出現多種 MCP 競爭的情形。
