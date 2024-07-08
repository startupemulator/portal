export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: true,
  head: {
    title: "StartupEmulator - training platform for developers",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      {
        name: "facebook-domain-verification",
        content: "sp2qb6zqlwb946mbvt1k7weioytdyc",
      },
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  server: {
    host: "0.0.0.0",
  },
  target: "server", // default is 'server'
  router: {
    base: "/",
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@assets/css/main.scss", "@node_modules/gleap/build/index.min.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/Vuelidate.ts" },
    { src: "~/plugins/filters.ts" },
    { src: "~/plugins/services/index.ts" },
    { src: "~plugins/vue-touch" },
    //{ src: "~plugins/gleap", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/svg",
    "@nuxtjs/stylelint-module",
    "@nuxtjs/eslint-module",
    "@nuxt/typescript-build",
    "@nuxtjs/device",
    "@nuxtjs/google-analytics",
    // "nuxt-purgecss",
  ],
  typescript: {
    typeCheck: {
      eslint: {
        files: "./**/*.{ts,js,vue}",
        fix: true,
      },
    },
  },
  stylelint: {
    fix: true,
  },
  eslint: {
    fix: true,
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/strapi",
    "@nuxtjs/proxy",
    "@nuxtjs/toast",
    "nuxt-device-detect",
    "nuxt-facebook-pixel-module",
    // "nuxt-helmet",
  ],
  toast: {
    position: "top-right",
    duration: 3000,
  },
  facebook: {
    track: "PageView",
    pixelId: "1019374148647435",
    autoPageView: true,
  },
  googleAnalytics: {
    id: "UA-170803471-1",
  },
  env: {
    baseURL: process.env.BASE_URL,
  },
  strapi: {
    url: process.env.STRAPI_URL || "/api/v1",
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.STRAPI_URL || "https://pear.startupemulator.com",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // analyze: true,
  },
  loading: "~/components/molecules/spinnerGlobal.vue",
};
