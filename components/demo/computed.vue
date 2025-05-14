<script setup>
import { ref, computed } from "vue";

const height = ref(180);
const weight = ref(75);

const bmi = computed(() => {
  const h = height.value / 100;
  return (weight.value / (h * h)).toFixed(1);
});

const suggestion = computed(() => {
  const value = parseFloat(bmi.value);
  if (value < 18.5) return "體重過輕";
  if (value < 24) return "正常";
  if (value < 27) return "過重";
  return "肥胖";
});

const suggestionClass = computed(() => {
  switch (suggestion.value) {
    case "體重過輕":
      return "text-blue-500";
    case "正常":
      return "text-green-600";
    case "過重":
      return "text-yellow-500";
    case "肥胖":
      return "text-red-600";
    default:
      return "";
  }
});
</script>

<template>
  <div class="p-4 max-w-sm mx-auto space-y-4">
    <label class="block">
      <span class="text-gray-700">身高（cm）</span>
      <input
        v-model.number="height"
        type="number"
        class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        placeholder="請輸入身高"
      />
    </label>

    <label class="block">
      <span class="text-gray-700">體重（kg）</span>
      <input
        v-model.number="weight"
        type="number"
        class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        placeholder="請輸入體重"
      />
    </label>

    <div class="mt-4 text-lg">
      <p>
        BMI：<strong>{{ bmi }}</strong>
      </p>
      <p>
        建議：<span :class="suggestionClass">{{ suggestion }}</span>
      </p>
    </div>
  </div>
</template>
