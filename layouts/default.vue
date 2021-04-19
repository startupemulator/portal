<template>
  <div>
    <Toast />
    <AppHeader
      :current-route="currentRoute"
      :is-logined="isLogined"
      :user="user"
    ></AppHeader>

    <Nuxt />

    <AppFooter></AppFooter>
  </div>
</template>
<script lang="ts">
import { Component, Watch, Vue } from "nuxt-property-decorator";
import AppFooter from "~/components/molecules/appFooter.vue";
import AppHeader from "~/components/molecules/appHeader.vue";

import Toast from "~/components/molecules/toast.vue";

@Component({
  components: {
    AppHeader,
    AppFooter,
    Toast,
  },
})
export default class extends Vue {
  isLogined = !!this.$strapi.user;
  user = this.$strapi.user ? this.$strapi.user.name : "";
  currentRoute = this.$router.currentRoute.name;

  @Watch("$route", { immediate: true, deep: true })
  onUrlChange() {
    this.currentRoute = this.$router.currentRoute.name;
  }

  @Watch("$strapi", { immediate: true, deep: true })
  onLogin() {
    this.isLogined = !!this.$strapi.user;
    this.user = this.$strapi.user ? this.$strapi.user.name : "";
  }

  get state() {
    return this.$store.state;
  }
}
</script>
