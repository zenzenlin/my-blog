---
title: npm install & npm ci
description: 介紹兩種安裝方式的差異
date: 2025-06-01
read: '1'
# icon: noto:construction
authors:
  - name: Mike Lin
    username: zenzenlin
    avatar: https://www.github.com/zenzenlin.png
    to: https://github.com/zenzenlin
    target: _blank
---

## npm (Node Package Manager)

> JavaScript 的套件管理器 📦

簡單來說，它是一個命令列工具，可以讓你在你的 JavaScript 專案中安裝、分享和管理可重複使用的程式碼 (也就是「套件」或「模組」)。

### 主要功能

- **安裝套件**： 你可以使用 npm 從龐大的 npm 註冊庫 (npm registry) 中下載並安裝其他人編寫好的 JavaScript 套件，例如 `React`、`Lodash` 或 `Express` 等
- **管理依賴**： npm 會追蹤你的專案依賴哪些套件以及它們的版本。這些資訊通常儲存在一個名為 `package.json` 的檔案中
- **發布套件**： 如果你自己編寫了有用的 JavaScript 程式碼，也可以透過 npm 將其發布到 npm 註冊庫，供其他人使用
- **執行腳本**： 你可以在 `package.json` 檔案中定義一些常用的**命令** (scripts)，例如啟動應用程式、執行測試等，然後透過 npm 執行這些命令

### 為什麼 npm 很重要？

- **效率提升**： 不用重複造輪子。你可以直接使用社群中已經測試過且廣泛使用的套件，加速開發過程
- **標準化**： npm 提供了一個標準化的方式來管理 JavaScript 專案的依賴關係，使得團隊合作更加容易
- **龐大的生態系**： npm 註冊庫擁有數百萬個套件，幾乎可以找到任何你需要的 JavaScript 功能

總而言之，npm 是現代 JavaScript 開發中不可或缺的工具，它大大簡化了程式碼的共享和管理，讓開發者可以更專注於建構應用程式的核心功能。

## npm install

`npm install` (或者其縮寫 `npm i`) 是 npm 中最核心且最常用的指令之一。它的主要功能是下載並安裝 JavaScript 套件 (packages) 到你的專案中，或者全域安裝工具。

### npm install 的一些重要概念

- `node_modules` 資料夾：所有透過 `npm install` 安裝的本地套件 (非全域) 都會存放在這個資料夾。通常這個資料夾不會被提交到版本控制，因為它可能會非常龐大，並且可以透過 `npm install` 和 `package.json` 重新產生
- `package.json` 檔案：專案的設定檔，記錄了專案的名稱、版本、作者、腳本 (scripts) 以及最重要的——專案依賴的套件列表 (`dependencies` 和 `devDependencies`)
- `package-lock.json` 檔案：這個檔案會自動產生或更新當 `node_modules` 樹或 `package.json` 被修改時。它精確記錄了 `node_modules` 中所有套件的**確切版本**以及它們的依賴樹。這確保了每次執行 `npm install` 時，即使依賴的套件有新的次版本發布，你也能得到一個完全相同的 `node_modules` 結構，從而保證了安裝的一致性和可重複性。強烈建議將 `package-lock.json` 提交到版本控制系統

### 主要用途與行為

1. 安裝專案的所有依賴 (Dependencies)

    在 JavaScript 專案的根目錄下，執行：`npm install` 或 `npm i`。npm 會讀取根目錄下的 `package.json` 檔，根據這些資訊，從 npm 註冊庫 (npm registry) 下載所有列出的套件及其依賴的套件。下載的套件會被存放在根目錄的 `node_modules` 資料夾中。

    同時，npm 也會參考 `package-lock.json` (如果存在) 來確保安裝**與上次一致的套件版本**，這**有助於避免不同開發環境或不同時間安裝導致的版本不一致問題**。

2. 安裝指定的套件

    當需要安裝特定的套件。例如，安裝一個 lodash 的常用工具庫：`npm install lodash`。預設情況下 (`npm 5.0.0` 及之後版本)，npm 會自動將 lodash 添加到 `package.json` 檔案的 `dependencies` 欄位中，表示 lodash 是你應用程式運行時所需要的套件。

3. 安裝特定版本的套件

    有時可能需要安裝套件的特定版本。例如，安裝 lodash 的 **4.17.20** 版本：`npm install lodash@4.17.20`

4. 安裝開發依賴 (Dev Dependencies)

    有些套件**只在開發過程中需要，在應用程式實際運行時並不需要**，例如測試框架 (Jest, Mocha)、程式碼檢查工具 (ESLint)、建構工具 (webpack) 等。使用 `npm install <package_name> --save-dev` 或 `npm install <package_name> -D`，套件資訊會被添加到 `package.json` 的 `devDependencies` 欄位中。

5. 全域安裝套件 (Global Install)

    有些套件是命令列工具，你希望在系統的任何地方都能執行它們，而不是僅限於單一專案。例如 nodemon (用於在開發 Node.js 應用時自動重啟伺服器的工具)。`npm install <package_name> --global` 或 `npm install <package_name> -g`。套件會被安裝到系統的一個全域位置 (具體位置依作業系統和 npm 設定而異)。通常，這會將該套件提供的命令列工具加入到系統的 PATH 環境變數中，讓你可以在任何終端機視窗直接執行。

## npm ci (npm clean-install)

npm ci 是 npm 中一個專為自動化環境 (如持續整合/持續部署 CI/CD 流程) 設計的指令，用於確保專案依賴安裝的一致性和可靠性。

### npm ci 的核心概念與行為

與 `npm install` 相比，`npm ci` 的行為更為嚴格和可預測，主要差異點如下：

- 依賴 `package-lock.json` 或 `npm-shrinkwrap.json`

    `npm ci` 強制要求專案中必須存在 `package-lock.json` 或 `npm-shrinkwrap.json` 檔案。它會完全依照 lock 檔案中記錄的版本和依賴樹來安裝套件，忽略 `package.json` 中的潛在更新 (例如 `^` 或 `~` 指定的版本)。這確保了每次安裝的結果都是完全一樣的。如果 lock 檔案不存在，或者與 `package.json` 中的依賴描述不一致，`npm ci` 會報錯並退出，而不是嘗試更新 lock 檔案。

- 刪除現有的 `node_modules`

    為了確保一個乾淨的安裝環境，`npm ci` 在安裝之前會先自動刪除專案中已存在的 `node_modules` 資料夾，避免任何潛在的衝突或先前安裝遺留的檔案影響。

- 不會修改 `package.json` 或 `package-lock.json`

    `npm ci` 的**設計目標是精確重現已知的依賴狀態，而不是去更新或修改依賴**。因此，它絕對不會寫入 `package.json` 或 `package-lock.json` 檔案。如果你想**新增或更新套件**，應該使用 `npm install <package_name>` 或 `npm update`。

- 速度通常更快 (在 CI 環境中)

    由於 `npm ci` 跳過了 `npm install` 中一些計算和解析依賴版本的複雜步驟 (因為它直接使用 lock 檔案)，並且它進行的是一次性完整的安裝，所以在 CI/CD 這類需要快速且可重複建置的環境中，`npm ci` 通常比 `npm install` 更快。

### 為什麼以及何時使用 `npm ci`？

- 持續整合/持續部署 (CI/CD) 流程

    這是 `npm ci` 最主要的應用場景。在 CI 伺服器上，你需要**確保每次建置都是基於完全相同的依賴版本**，以避免「在我電腦上可以跑，但在伺服器上不行」的問題
- 確保可重現的建置 (Reproducible Builds)

    當你需要保證不同開發者、不同時間或不同環境下，安裝的依賴版本完全一致時
- 本地測試環境的一致性

    有時開發者也會在本地使用 `npm ci` 來確保自己的開發環境與 CI 環境或團隊其他成員的環境完全一致，特別是在切換分支或拉取最新程式碼後，想要一個乾淨的依賴重裝
