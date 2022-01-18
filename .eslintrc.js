module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: [
    "plugin:vue/recommended",
    "plugin:prettier-vue/recommended",
    "prettier",
    "@nuxtjs",
    "@nuxtjs/eslint-config-typescript",
    "plugin:prettier/recommended",
    "plugin:nuxt/recommended",
  ],
  plugins: ["prettier"],
  // add your custom rules here
  rules: {
    "no-console": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "import/no-mutable-exports": "off",
    camelcase: "off",
    "prettier/prettier": "error",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
};
