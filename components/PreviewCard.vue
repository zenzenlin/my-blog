<script setup>
defineProps({
  prose: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="py-1 dark:text-white">
    <slot />
  </div>
</template>
