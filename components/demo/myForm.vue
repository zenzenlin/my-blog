<script setup lang="ts">
const props = defineProps<{
  name: string;
  age: number;
  useDefineModel?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:name", value: string): void;
  (e: "update:age", value: number): void;
}>();

// defineModel 版本（會在 useDefineModel 為 true 時使用）
const modelName = defineModel<string>("name");
const modelAge = defineModel<number>("age");
</script>

<template>
  <div class="p-4 border rounded space-y-4">
    <label class="block">
      姓名：
      <input
        v-if="!props.useDefineModel"
        type="text"
        class="border px-2 py-1"
        :value="props.name"
        @input="emit('update:name', ($event.target as HTMLInputElement).value)"
      />
      <input v-else v-model="modelName" type="text" class="border px-2 py-1" />
    </label>

    <label class="block">
      年齡：
      <input
        v-if="!props.useDefineModel"
        type="number"
        class="border px-2 py-1"
        :value="props.age"
        @input="
          emit('update:age', Number(($event.target as HTMLInputElement).value))
        "
      />
      <input v-else v-model="modelAge" type="number" class="border px-2 py-1" />
    </label>
  </div>
</template>
