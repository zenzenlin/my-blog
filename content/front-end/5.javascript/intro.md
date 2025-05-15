---
title: JavaScript 底層概述
description: JavaScript 底層概述
date: 2025-05-15
read: '1'
authors:
  - name: Mike Lin
    username: zenzenlin
    avatar: https://www.github.com/zenzenlin.png
    to: https://github.com/zenzenlin
    target: _blank
---

## JavaScript 的應用

在瀏覽器中使用 JavaScript，可以讓網頁具備互動性，讓使用者能與頁面產生動態互動，例如：

- 操作與更新 HTML 或 CSS 樣式
- 回應使用者的行為（如點擊、滑動等）
- 處理使用者輸入的資料，如驗證、計算或暫存
- 傳送請求至伺服器以取得資料，並即時更新網頁內容
- 管理 cookies（如設定、讀取、刪除）

## JavaScript 的限制

為了保障使用者的安全與隱私，瀏覽器中的 JavaScript 在執行上有以下限制：

- 無法直接**讀取或修改**使用者電腦上的檔案，或**執行**本機應用程式。例外情況為：使用者主動上傳檔案（例如拖放文件至網頁），此時可透過 `File API` 進行處理。
- 基於**同源政策**（Same-Origin Policy），JavaScript 無法存取來自不同網域的網頁資料，也無法操作其他開啟的分頁，即使這些分頁來自相同網站。
- 某些與硬體相關的功能（如存取相機或麥克風）**需經過使用者明確授權**後才能使用。

## 抓取 DOM 做操作

當網頁載入時，瀏覽器會將 HTML 文件解析為一個稱為 DOM（Document Object Model）的結構。DOM 是一種**階層式的樹狀資料結構**，表示頁面上的各個元素節點。

在 JavaScript 中，我們經常會操作 DOM 中的元素，例如使用：

- `document.getElementById()`：根據 ID 取得元素
- `document.querySelector()`：使用 CSS 選擇器選取單一元素

透過這些方法，我們可以對元素進行動態修改，例如改變內容、樣式或事件綁定等。

## 渲染次序

瀏覽器會依照 HTML 的書寫順序**從上到下**解析並執行程式碼。為了避免 JavaScript 阻塞網頁的渲染，我們通常會將 `<script>` 標籤放在即將結尾的 `</body>` 標籤前，確保 HTML 元素已經載入完成。若 JavaScript 在 DOM 尚未建立前就嘗試操作網頁元素，可能會發生錯誤。

而除了將 `<script>` 標籤放在頁面底部外，也可以使用：

- `defer` 屬性：`<script>` 標籤上的屬性，代表延後執行 JavaScript，直到整個 HTML 解析完成

```html
<script src="main.js" defer></script>
```

- `DOMContentLoaded` 事件：確保 DOM 結構已完全載入後再執行程式碼

```js
document.addEventListener('DOMContentLoaded', () => {
  // 安全操作 DOM 的程式碼
});
```

## JavaScript 在瀏覽器中的運作原理

**JavaScript 引擎**負責將我們撰寫的 JavaScript 程式碼轉換為電腦可以理解的**低階語言**，進而執行對應的操作。因此若沒有 JavaScript 引擎，這些程式碼對電腦來說不過是一堆無法解析的文字。

每個瀏覽器都有內建的 JavaScript 引擎，常見包括：

- Chrome / Opera：使用 V8 引擎
- Firefox：使用 SpiderMonkey
- Safari：使用 JavaScriptCore（又稱 Nitro）
- IE / 舊版 Edge：使用 Chakra

這些引擎也被稱為 **ECMAScript 引擎**，因為它們遵循 ECMA 組織所制定的 JavaScript **語言標準**。

## JavaScript 引擎的核心功能

JavaScript 引擎的核心功能，是**將高階語言（JavaScript）翻譯為低階語言（如機器碼），讓電腦能執行**。其中最具代表性的引擎是 **V8**，由 Google 使用 C++ 開發，廣泛應用於 **Chrome** 和 **Node.js**。

而為了讓不同廠商開發的引擎遵循一致的行為準則，歐洲電腦製造商協會（ECMA）制定了一套語言標準，稱為 **ECMAScript（簡稱 ES）**。這也是我們常聽到 ES6、ES7 等版本名稱的由來。JavaScript 引擎會根據 ECMAScript 的規範持續更新，支援新的語法與功能，因此我們也能透過特定工具（如 Babel）或網站（如 [Can I Use](https://caniuse.com/)）檢查特定語法是否被各家瀏覽器支援。

### JavaScript 引擎的執行流程解析

以下是 JavaScript 引擎執行程式碼的主要步驟（以 V8 為例）：

1. **Parser**（語法解析器）

    這一步負責**掃描原始 JavaScript 程式碼**，透過關鍵字和語法規則來**分析每一段程式的語義**。例如，它能判斷你現在寫的是變數宣告、函式還是流程控制語句。這就像把一段話用文法分析成「主詞、動詞、受詞」。

2. **AST**（抽象語法樹）

    接著，Parser 會建立出一個稱為「抽象語法樹（AST, Abstract Syntax Tree）」的結構。這棵樹會**以階層式方式代表整個程式碼的邏輯與結構**。你可以透過 [AST Explorer](https://astexplorer.net/) 線上工具來查看對應的 AST 結構，觀察這個過程，進一步理解程式碼是如何被引擎理解的。

3. **Interpreter**（直譯器）產生 ByteCode

    AST 建立完成後，會交給 Interpreter 處理，它會把 AST 轉換成一種**中間格式**叫做 ByteCode。這個 ByteCode 雖然不是最底層的機器碼，但已經可以被引擎快速執行了。這個階段是 JavaScript 能「邊翻譯邊執行」的關鍵。

4. **Profiler**（性能分析器）介入監控、性能分析

    在執行 ByteCode 的同時，引擎內部的 Profiler 會默默觀察程式執行的狀況，**尋找可以被優化的程式碼**，特別是哪一段程式被反覆執行、效能表現是否有待提升，例如一個被重複執行的迴圈或頻繁呼叫的函式，然後將它們傳遞給 **Compiler**。

5. **Compiler**（JIT 編譯器）優化並生成機器碼

    當 Profiler 發現某段程式是「熱點（Hot Path）」，就會把這段程式交給 Compiler，**進一步編譯成效能更好的機器碼**。這段優化過的機器碼會取代原本執行的 ByteCode，使整體執行效能更高。

透過這種機制，JavaScript 引擎可以結合直譯與編譯的優點：**一開始靠直譯快速啟動程式**，接著動態找出瓶頸，最後**用 JIT 編譯器將熱點優化**執行，達到又快又強的效能表現。

![image](https://i.imgur.com/kSGCP16.png)

### 直譯器 vs 編譯器

我們在討論程式語言時，經常會提到兩種「讓電腦能理解程式碼」的方法：

- 🛠️ **編譯型**（Compiled Language）
  - 程式碼會在執行前，整體先經過編譯器一次性地轉成機器語言
  - 若有語法錯誤，會在編譯階段就被攔下來，整支程式不會執行
  - 執行速度快，適合效能要求高的應用
  - 例子：C++、Java（雖然 Java 編譯的是 ByteCode，仍屬編譯型）

- ⚡ **直譯型**（Interpreted Language）
  - 程式碼會一行一行地即時翻譯與執行
  - 遇到錯誤時，是執行到那一行才會報錯，其它沒問題的程式仍可繼續運行
  - 開發迭代快，適合快速原型設計
  - 例子：Python、PHP，還有我們的主角 —— JavaScript

::alert{type="note" icon="lucide:pencil"}
Compiler 雖然需要花費一些時間來編譯程式碼，但是會生成對執行時更優的機器碼。
<br/>
Interpreter 可以立即開始執行程式碼，但不會進行優化。
::

### 那 JavaScript 到底是哪一種？

傳統上，JavaScript 被認為是直譯型語言，因為早期的 JS 引擎確實是將程式碼逐行解讀並立即執行的。但隨著 V8 等高效引擎的出現，這個界線變得模糊。

現代的 JS 引擎（像是 V8）使用的是一種叫作 **JIT**（Just-In-Time）Compiler 的技術，也就是「及時編譯器」。它**結合了直譯器和編譯器**的優點：

1. 一開始由 Interpreter（直譯器）快速解譯執行程式碼，能即時響應使用者行為
2. 同時，Profiler 監控哪些程式碼重複執行，也就是「熱點程式碼」
3. 然後把這些熱點交給 Compiler（編譯器）進行優化編譯，轉換成更有效率的機器碼
4. 最後，優化過的程式碼取代原本的 ByteCode，後續執行速度大幅提升

### 關於 ByteCode

ByteCode 是一種 **中間碼**，**介於 JavaScript 原始碼和真正的機器語言之間**。

- 它不像 JavaScript 那麼高階，也不像機器語言那麼底層
- 它無法直接被電腦硬體執行，但可以被像 V8 引擎這樣的虛擬機執行
- 所以當我們的 JS 程式被直譯器轉成 ByteCode 後，V8 就能直接執行它，這也是 JS 能「邊翻譯邊執行」的關鍵

簡單來說，ByteCode 是 JavaScript 執行過程中的「中繼站」，它不是最終形態，但比原始 JS 更接近電腦能理解的語言。
