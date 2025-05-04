<template>
  <div class="container">
    <h1>我的部落格</h1>
    <Suspense>
      <ContentRenderer :value="data" />
    </Suspense>
  </div>
</template>

<script setup>
const { data } = await useAsyncData(() =>
  queryCollection("content").path("/").first()
);
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
}
</style>
