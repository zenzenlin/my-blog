<script setup>
import { ref, watch } from "vue";

const count = ref(0);
const message = ref("");

watch(
  count,
  (newValue, oldValue) => {
    if (newValue > 10) {
      message.value = "計數超過 10";
    } else {
      message.value = "計數在 10 以下";
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div>
    <p>當前計數：{{ count }}</p>
    <button class="btn hover:bg-emerald-400" @click="count++">增加計數</button>
    <button class="btn hover:bg-emerald-400" @click="count--">減少計數</button>
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.btn {
  background-color: #34d399;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #047857;
}
</style>
