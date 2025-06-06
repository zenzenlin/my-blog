<template>
  <nav aria-label="麵包屑導航" class="mb-4">
    <ol class="flex items-center space-x-2 text-sm text-muted-foreground">
      <li>
        <NuxtLink
          to="/"
          class="hover:text-foreground transition-colors"
          aria-label="回到首頁"
        >
          <Icon name="lucide:home" class="w-4 h-4" />
        </NuxtLink>
      </li>
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="flex items-center"
      >
        <Icon
          name="lucide:chevron-right"
          class="w-4 h-4 mx-2 text-muted-foreground"
        />
        <NuxtLink
          v-if="crumb.to && index < breadcrumbs.length - 1"
          :to="crumb.to"
          class="hover:text-foreground transition-colors"
          :aria-label="`前往 ${crumb.text}`"
        >
          {{ crumb.text }}
        </NuxtLink>
        <span
          v-else
          class="text-foreground font-medium"
          :aria-current="index === breadcrumbs.length - 1 ? 'page' : undefined"
        >
          {{ crumb.text }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  text: string;
  to?: string;
}

interface Props {
  breadcrumbs: BreadcrumbItem[];
}

const props = defineProps<Props>();

// 生成結構化資料
const breadcrumbSchema = computed(() => {
  const items = [
    { name: "首頁", path: "/" },
    ...props.breadcrumbs.map((crumb) => ({
      name: crumb.text,
      path: crumb.to || "",
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://zenzenlin.github.io/my-blog${item.path}`,
    })),
  };
});

// 注入結構化資料到頁面頭部
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(breadcrumbSchema.value),
    },
  ],
});
</script>
