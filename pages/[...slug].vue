<template>
  <div class="container">
    <div v-if="pending" class="loading">載入中...</div>
    <div v-else-if="error" class="error">
      <h1>找不到文章</h1>
      <p>抱歉，您要查看的文章不存在。</p>
      <NuxtLink to="/" class="back-link">返回首頁</NuxtLink>
    </div>
    <article v-else class="article">
      <h1>{{ page.title }}</h1>
      <div class="meta">
        <span class="date">{{ formatDate(page.date) }}</span>
        <span class="author" v-if="page.author">作者：{{ page.author }}</span>
      </div>
      <ContentRenderer :value="page" />
    </article>
  </div>
</template>

<script setup>
const { path } = useRoute();
const {
  data: page,
  pending,
  error,
} = await useAsyncData(`content-${path}`, () => queryContent(path).findOne());

function formatDate(date) {
  return new Date(date).toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}

.error {
  text-align: center;
  padding: 2rem;
}

.error h1 {
  color: #e74c3c;
  margin-bottom: 1rem;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: #3498db;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.article {
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.meta {
  color: #666;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
}

:deep(h2) {
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 2rem 0 1rem;
}

:deep(p) {
  line-height: 1.8;
  color: #333;
  margin-bottom: 1rem;
}

:deep(ul),
:deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

:deep(li) {
  margin-bottom: 0.5rem;
}

:deep(code) {
  background: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
}

:deep(pre) {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
}
</style>
