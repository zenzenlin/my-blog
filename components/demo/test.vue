<script setup>
import { ref } from "vue";
const count = ref(0);
</script>

<template>
  <div class="demo bg-emerald-400 p-4 rounded-lg">
    <button
      class="bg-emerald-700 text-white px-2 py-1 rounded-lg"
      @click="count++"
    >
      Count is: {{ count }}
    </button>
  </div>
</template>
