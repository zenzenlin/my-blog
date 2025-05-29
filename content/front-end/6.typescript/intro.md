---
title: Top 10 TypeScript Utility Types
description: 介紹 10 個有用的 Utility Types
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

## 1. `Partial<T>`

`Partial<T>` 類型使類型的**所有屬性成為可選**的。

如果你有定義一個完整物件的接口，但有時只需要更新該物件的一部分，則 `Partial<T>` 是**使其所有屬性成為可選**的好方法。

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

const updateUser = (user: Partial<User>) => {
  // ... 實際更新邏輯，user 可以只包含 name 或 email 或其他部分
}
```

### 底層原理

`Partial<T>` 的實現原理其實非常簡潔而優雅，它利用了 TypeScript 的 Mapped Types 和 `keyof` 操作符：

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

- `keyof T`: 這會取得類型 T 的所有屬性名稱，並組成一個聯合類型（例如，`'id' | 'name' | 'email'`）
- `[P in keyof T]`: 這是 Mapped Types 的語法，它會遍歷 `keyof T` 中的每一個屬性 `P`
- `?: T[P]`: 在遍歷的過程中，它會為每個屬性 `P` 添加 `?` 符號，使其變為可選的，並且其值類型保持為 `T[P]`（即原始類型 `T` 中對應屬性 `P` 的類型）

## 2. `Required<T>`

與 `Partial<T>` 相反，它使某一類型的**所有屬性成為必須**的。

```ts
interface User {
  id?: number;
  name?: string;
  email?: string;
}

const createUser = (user: Required<User>) => {
  console.log(user);
};
// createUser({ name: "Alice" }); // Error: Property 'id' is missing
```

### 底層原理

`Required<T>` 的實現同樣基於 Mapped Types，它巧妙地移除了屬性上的 `?` 修飾符：

```ts
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

- `keyof T`: 同樣取得類型 `T` 的所有屬性名稱
- `[P in keyof T]`: 遍歷這些屬性
- `-?: T[P]`: 這裡的 `-` 符號是關鍵！它會移除屬性 `P` 上的 `?` 修飾符，使其從可選變為必須。其值類型依然保持為 `T[P]`

## 3. `Readonly<T>`

`Readonly<T>` 使某個類型的**所有屬性變成唯讀**，初始化後**無法變更它們的值**。它強制執行了一種不變性（immutability），這在許多場景下都非常有利於程式碼的穩定性和安全性。

```ts
interface User {
  id: number;
  name: string;
}

const user: Readonly<User> = { id: 1, name: "Alice" };

// user.name = "Bob"; // Error: Cannot assign to 'name' because it is a read-only property
```

### 底層原理

與 `Partial<T>` 和 `Required<T>` 類似的實現，同樣利用了 Mapped Types，但是添加 `readonly` 修飾符：

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

- `keyof T`: 取得類型 `T` 的所有屬性名稱
- `[P in keyof T]`: 遍歷這些屬性
- `readonly T[P]`: 為每個屬性 `P` 添加 `readonly` 修飾符，使其變成唯讀，同時保持其原始值類型 `T[P]`

## 4. `Record<K, T>`

`Record<K, T>` 會建立一個新物件類型，其中**鍵（keys）的類型由 K 指定，而值（values）的類型由 T 指定**。當你需要一個類似地圖的結構來控制鍵和值時，它特別有用。

```ts
type Role = "admin" | "user" | "guest";

// 確保 admin、user 和 guest 鍵的值都是字串
const users: Record<Role, string> = {
  admin: "Alice",
  user: "Bob",
  guest: "Charlie",
};
```

### 底層原理

`Record<K, T>` 的實現同樣運用了 Mapped Types，但它更明確地指定了鍵的類型：

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

- `K extends keyof any`: 這是一個約束，表明 `K` 必須是可以用作物件鍵的類型。`keyof any` 基本上是 `string | number | symbol` 的聯合類型。這確保了你傳給 `K` 的類型確實可以用來作為物件的鍵
- `[P in K]`: 這會遍歷類型 `K` 中的每一個成員 `P`（例如，如果 `K` 是 `'admin' | 'user'`，那麼 `P` 會先是 `'admin'`，然後是 `'user'`）
- `: T`: 對於 `K` 中的每一個鍵 `P`，其對應的值類型都被設定為 `T`

## 5. `Pick<T, K>`

`Pick<T, K>` 透過**從現有類型中選擇特定屬性**來建立新物件類型。

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

// 建立一個僅包含 name 和 email 的類型
type UserName = Pick<User, "name" | "email">;
```

### 底層原理

`Pick<T, K>` 的實現同樣是基於 Mapped Types 和 `keyof` 加上 `extends` 約束：

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

- `K extends keyof T`: 這是一個關鍵的約束！它確保你傳入的 `K` 類型（即你想要挑選的鍵）必須是 `T` 中確實存在的屬性名稱的聯合類型。如果 `K` 包含了 `T` 中不存在的屬性，TypeScript 會直接報錯，這提供了強大的型別安全保證
- `[P in K]`: 這會遍歷 `K` 中的每一個鍵 `P`
- `: T[P]`: 對於每個被選中的鍵 `P`，其值類型會從原始類型 `T` 中對應的屬性 `T[P]` 複製過來

## 6. `Omit<T, K>`

它與 `Pick<T, K>` 的作用恰好相反，`Omit<T, K>` 透過**從現有類型中排除特定屬性**來建立新物件類型。

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

// 建立一個類型，具有 User 的所有屬性（電子郵件除外）
type UserWithoutEmail = Omit<User, "email">;
```

### 底層原理

`Omit<T, K>` 的實現其實是結合了 `Pick<T, K>` 和 `Exclude<T, U>`（下面也會提到它）。它的大致邏輯是：先取得 `T` 中所有屬性的鍵，然後從這些鍵中「排除」掉 `K` 所指定的鍵，最後再用 `Pick` 選取剩餘的鍵。

```ts
// 簡化後的原理說明
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

- `keyof T`: 取得類型 `T` 的所有屬性名稱的聯合類型
- `Exclude<keyof T, K>`: 這會從 `T` 的所有鍵中，排除掉 `K` 中定義的鍵。例如，如果 `keyof T` 是 `'id' | 'name' | 'email'` 且 `K` 是 `'email'`，那麼 `Exclude` 的結果就是 `'id' | 'name'`
- `Pick<T, ...>`: 最後，`Pick` 再用 `Exclude` 運算後的結果（即剩餘的鍵）去從 `T` 中挑選出對應的屬性，形成新的類型

## 7. `Exclude<T, U>`

`Exclude<T, U>` 從聯合類型中**刪除特定值**。

```ts
type Status = "active" | "inactive" | "banned";

// 建立一個包含 active 和 inactive 但沒有 banned 的類型
type AllowedStatus = Exclude<Status, "banned">;
```

### 底層原理

`Exclude<T, U>` 的實現原理其實基於 TypeScript 的**條件類型（Conditional Types）**，這是一個非常強大的特性：

```ts
type Exclude<T, U> = T extends U ? never : T;
```

- `T extends U ? never : T`: 這是一個條件表達式。它會對 `T` 中的每個成員進行檢查：
  - 如果 `T` 的某個成員可以賦值給 `U`（`T extends U` 為真），那麼這個成員就會被替換成 `never`。`never` 是一個空類型，表示「永不存在的值」，它在聯合類型中會被自動移除。
  - 如果 `T` 的某個成員不能賦值給 `U`（`T extends U` 為假），那麼這個成員就會被保留下來（`T`）。
- 最終，所有被替換為 `never` 的成員都會從最終的聯合類型中被「排除」掉。

## 8. `Extract<T, U>`

`Extract<T, U>` 從聯合類型中**提取可指派給另一種類型的特定值**。

```ts
type Status = "active" | "inactive" | "banned";

// 建立僅具有 active 和 inactive 的類型
type ActiveStatus = Extract<Status, "active" | "inactive">;
```

### 底層原理

實現原理與 `Exclude<T, U>` 異曲同工，同樣基於 TypeScript 的**條件類型（Conditional Types）**，只是判斷邏輯相反：

```ts
type Extract<T, U> = T extends U ? T : never;
```

- `T extends U ? T : never`: 這同樣是一個條件表達式。它會對 `T` 中的每個成員進行檢查：
  - 如果 `T` 的某個成員可以賦值給 `U`（`T extends U` 為真），那麼這個成員就會被保留下來（`T`）
  - 如果 `T` 的某個成員不能賦值給 `U`（`T extends U` 為假），那麼這個成員就會被替換成 `never`
- 最終，所有被替換為 `never` 的成員都會從最終的聯合類型中被「移除」，只留下符合條件的成員

### `Pick / Omit` 和 `Extract / Exclude` 這兩組工具類型之間的核心差異

它們的主要差異就在於它們操作的「**目標類型**」不同：

`Pick<T, K>` 和 `Omit<T, K>`：

- 操作目標： 主要針對**物件類型（Object Types）或接口（Interfaces）** 的屬性進行操作
- 操作方式： `Pick` 是選擇物件中的特定屬性，而 `Omit` 是排除物件中的特定屬性
- 類型 `K`： 傳入的 `K` 參數必須是該物件類型 `T` 中存在的屬性名稱（`keyof T`）

`Extract<T, U>` 和 `Exclude<T, U>`：

- 操作目標： 專門針對**聯合類型（Union Types）** 的成員進行操作
- 操作方式： `Extract` 是從聯合類型中「提取」出符合條件的成員，而 `Exclude` 是從聯合類型中「排除」不符合條件的成員
- 類型 `U`： 傳入的 `U` 參數是與 `T` 中的成員進行「可賦值性」比較，以決定是保留還是排除

| 特性    | Pick<T, K> & Omit<T, K>             | Extract<T, U> & Exclude<T, U>    |
|--------|--------------------------------------|----------------------------------|
| 操作目標 | 物件類型 (Object Types / Interfaces) | 聯合類型 (Union Types)             |
| 操作對象 | 物件的屬性 (Properties)               | 聯合類型的成員 (Members)           |
| K / U 參數 | `K` 必須是 `T` 中存在的屬性鍵 (`keyof T`)    | `U` 是與 `T` 中成員進行可賦值性比較的類型 |
| 目標     | 建立具有/不具有特定屬性的新物件類型       | 建立具有/不具有特定成員的新聯合類型    |
| 思考角度 | 關於物件「結構」的增減                  | 關於聯合類型「成員」的篩選           |

## 9. `NonNullable<T>`

`NonNullable<T>` 從類型中**刪除 `null` 和 `undefined`**。

```ts
type User = string | null | undefined;

// 確保 ValidUser 永遠不會為 null 或 undefined
type ValidUser = NonNullable<User>;
```

### 底層原理

`NonNullable<T>` 的實現非常簡潔，它正是利用了上面提到的 `Exclude<T, U>`：

```ts
type NonNullable<T> = Exclude<T, null | undefined>;
```

它基本上就是說：「從類型 `T` 中，排除掉 `null` 和 `undefined`。」

## 10. `ReturnType<T>`

`ReturnType<T>` **提取函數的回傳類型**。

```ts
function getUser() {
  return { id: 1, name: "John" };
}

// 提取 getUser 函數傳回的類型，這邊是一個具有 id 和 name 的物件
type UserType = ReturnType<typeof getUser>;
```

### 底層原理 (Under the Hood):

`ReturnType<T>` 的實現同樣依賴於 TypeScript 的**條件類型（Conditional Types）** 和型別推斷（`infer` 關鍵字）：

```ts
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

- `T extends (...args: any) => any`: 這是一個約束，確保 `T` 必須是一個函式類型。`(...args: any) => any` 表示接受任意參數並回傳任意值的函式
- `T extends (...args: any) => infer R ? R : any`: 這是條件類型的主體：
  - 如果函式類型 `T` 可以賦值給 `(...args: any) => infer R`（意思是 `T` 確實是一個函式，並且它的回傳類型可以被推斷為 `R`），那麼就回傳這個被推斷出來的類型 `R`
  - 否則（如果 `T` 不是一個函式類型），就回傳 `any`
