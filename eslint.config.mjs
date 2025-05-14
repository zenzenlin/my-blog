// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always", // 允許 <input />、<br /> 等自閉合
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
    "vue/no-multiple-template-root": "off", // 允許多根元素
    "@typescript-eslint/no-explicit-any": "off", // 允許使用 any
  },
});
