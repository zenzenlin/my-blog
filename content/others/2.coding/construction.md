---
title: 資料結構
description: Des
date: 2025-05-16
read: '1'
authors:
  - name: Mike Lin
    username: zenzenlin
    avatar: https://www.github.com/zenzenlin.png
    to: https://github.com/zenzenlin
    target: _blank
---

## Array

📚 Array（陣列）

Array 是一種**有順序**、可**透過索引**快速存取的資料結構。就像一排抽屜，每個抽屜有個編號（index），你可以立刻打開第 3 個抽屜拿東西。

🧠 優點：

- 存取元素速度快：`arr[X]` 是 O(1)
- 適合儲存長度固定或可預期大小的資料
- 在記憶體中連續排列，快取命中率高

```ts
const fruits = ['apple', 'banana', 'cherry']
console.log(fruits[1]) // banana
fruits.push('dragonfruit')
```

## Linked List

### Linked List（鏈結串列）

Linked List 是一串節點，**每個節點除了自己值，還知道下一個是誰**。你得「一個個走」來找想要的東西。

🧠 優點：

- 插入/刪除效率高（不需移動其他元素）
- 動態長度，記憶體利用率佳
- 適合實作 Stack / Queue

```ts
class ListNode {
  value: number
  next: ListNode | null = null
  constructor(value: number) {
    this.value = value
  }
}

const node1 = new ListNode(1)
node1.next = new ListNode(2)
console.log(node1.next?.value) // 2
```

### Doubly Linked List（雙向鏈結串列）

這是一種每個節點都同時指向**前一個節點（prev）和下一個節點（next）**的資料結構。
它就像捷運列車，你可以從任意車廂往前或往後移動，或者想像一群人手拉手排隊，每個人都知道他前面跟後面是誰，所以可以輕鬆插隊或退出。不像單向鏈結串列只能「一路往前開」。

🧠 優點：

- 可以從任一節點雙向移動（前後走都行）
- 插入/刪除時只需改幾個指標，不用搬移整個陣列
- 適合需要頻繁插入、刪除或雙向走訪的情境（如：瀏覽歷史、音樂播放清單）

```ts
// 每個節點
class Node<T> {
  value: T
  prev: Node<T> | null = null
  next: Node<T> | null = null

  constructor(value: T) {
    this.value = value
  }
}

class DoublyLinkedList<T> {
  head: Node<T> | null = null
  tail: Node<T> | null = null

  // 尾端新增節點
  append(value: T) {
    const newNode = new Node(value)
    if (!this.tail) {
      // 沒有尾端，頭尾都指向新增的當前節點
      this.head = this.tail = newNode
    } else {
      // 已有尾端，尾端的次節點指向新增的當前節點
      // 新增的當前節點的前節點指向尾端
      // （新）尾端指向新增的當前節點
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }
  }

  // 從尾端移除節點
  pop(): T | null {
    if (!this.tail) return null

    const value = this.tail.value
    this.tail = this.tail.prev

    if (this.tail) {
      this.tail.next = null
    } else {
      this.head = null
    }

    return value
  }

  // 印出所有值
  print() {
    let curr = this.head
    const result = []
    while (curr) {
      result.push(curr.value)
      curr = curr.next
    }
    console.log('List:', result.join(' <-> '))
  }
}

const list = new DoublyLinkedList<number>()
list.append(1)
list.append(2)
list.append(3)
list.print()                    // List: 1 <-> 2 <-> 3
console.log('Pop:', list.pop()) // Pop: 3
list.print()                    // List: 1 <-> 2
```

## Stack

📦 什麼是 Stack（堆疊）？

Stack 是 **後進先出（LIFO）** 的資料結構。最後放進去的東西，會最先被拿出來。想像一疊盤子：你**只能從上面拿**。

🧠 優點：

- `push()` / `pop()` 都是 O(1)
- 適合處理「回溯」、「遞迴」、「Undo」等場景

```ts
const stack: number[] = []
stack.push(10)
stack.push(20)
console.log(stack.pop()) // 20
```

## Queue

🚶‍♂️ 什麼是 Queue（佇列）？

Queue 是 **先進先出（FIFO）** 的資料結構。就像排隊，**先來的先服務**，後來的得乖乖等。

🧠 優點：

- `enqueue()` / `dequeue()` 平均是 O(1)（配合 Linked List）
- 適合排程、流程管理、BFS 等情境

```ts
const queue: number[] = []
queue.push(1)        // enqueue
queue.push(2)
console.log(queue.shift()) // dequeue → 1
```

## Tree

🌳 什麼是 Tree（樹狀結構）？

Tree 是一種**分層結構**，**每個節點可以有多個子節點**，最上面是 root。最常見是「二元樹」，每個節點最多兩個子節點。

🧠 優點：

- 資料分類、查找效率高（如 BST 為 O(log n)）
- 適合表示 DOM 結構、檔案總管、AI 決策流程等

```ts
class TreeNode {
  value: number
  left: TreeNode | null = null
  right: TreeNode | null = null
  constructor(value: number) {
    this.value = value
  }
}

const root = new TreeNode(10)
root.left = new TreeNode(5)
root.right = new TreeNode(15)
```

## Graph

🕸️ 什麼是 Graph（圖）？

Graph 是一種由「**節點（Node）**」和「**邊（Edge）**」組成的資料結構，可以表示**任意實體之間的關係**。
舉例來說，社群網路中的人（節點）與朋友關係（邊），就可以用圖來建模。

🧠 優點：

- 適合表達複雜網絡：像地圖、推薦系統、社交網路
- 可表示**有向圖**（Directed）與**無向圖**（Undirected）
- 可用於許多演算法：BFS、DFS、Dijkstra、A*、Topological Sort 等

✅ 鄰接清單（Adjacency List）

適合**稀疏圖**（邊不多）：

```ts
const graph: Record<string, string[]> = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A'],
  D: ['B'],
}
console.log(graph['A']) // ['B', 'C']

// 實際化
const friends: Record<string, string[]> = {
  Alice:   ['Bob', 'Charlie'],
  Bob:     ['Alice'],
  Charlie: ['Alice'],
}
console.log('Alice 的朋友：', friends['Alice']) // ['Bob', 'Charlie']
```

✅ 鄰接矩陣（Adjacency Matrix）

適合**密集圖**（邊很多）：

```ts
const nodes = ['A', 'B', 'C']
const matrix = [
// A  B  C
  [0, 1, 1], // A
  [1, 0, 0], // B
  [1, 0, 0], // C
]
console.log(matrix[0][1]) // 1 表示 A → B 有邊

// 實際化
const cities = ['Taipei', 'Taichung', 'Tainan']
const roadMap = [
// Taipei, Taichung, Tainan
  [0,          1,        1],   // Taipei
  [1,          0,        0],   // Taichung
  [1,          0,        0],   // Tainan
]

// 查詢 Taichung 是否可直達 Taipei
const from = 'Taichung'
const to = 'Taipei'
const fromIndex = cities.indexOf(from)
const toIndex = cities.indexOf(to)

console.log(`${from} -> ${to}`, roadMap[fromIndex][toIndex] === 1) // true
```

## Hash Map

🔐 什麼是 Hash Map（雜湊表）？？

Hash Map（又稱為 Hash Table、雜湊表）是一種 **可以透過 key 快速查到 value** 的資料結構。
就像你有一個抽屜，標著「鑰匙」、「護照」、「印章」…你想找某樣東西，只要根據標籤找對抽屜就能拿到，速度超快。

🧠 優點：

- `get(key)` 和 `set(key, value)` 平均都是 O(1)
- 常用於實作快取、字典、去重、統計
- 常見實作：JS/TS 中的 `Map` 或 `Object`。

```js
const map = new Map()
map.set('a', 100)
map.get('a') // 100
```
