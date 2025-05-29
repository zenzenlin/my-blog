<script setup>
import { ref } from "vue";
import MyForm from "./myForm.vue";

const normalForm = ref({ name: "Bob", age: 18 });
const definedModelForm = ref({ name: "John", age: 28 });
</script>

<template>
  <h2 class="text-2xl font-bold mb-4">使用一般 v-model</h2>
  <p class="mb-4">{{ normalForm.name }} 的年齡是 {{ normalForm.age }} 歲</p>
  <MyForm v-model:name="normalForm.name" v-model:age="normalForm.age" />

  <h2 class="text-2xl font-bold my-4">使用 definedModel</h2>
  <p class="mb-4">
    {{ definedModelForm.name }} 的年齡是 {{ definedModelForm.age }} 歲
  </p>
  <MyForm
    v-model:name="definedModelForm.name"
    v-model:age="definedModelForm.age"
    use-define-model
  />
</template>
