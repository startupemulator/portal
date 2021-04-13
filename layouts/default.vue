<template>
  <div>
    <AppHeader
      :current-route="currentRoute"
      :is-logined="isLogined"
    ></AppHeader>
    <Nuxt />
    <AppFooter></AppFooter>
  </div>
</template>
<script lang="ts">
import { Component, Watch, Route, Vue, strapi } from "nuxt-property-decorator";
import AppFooter from "~/components/molecules/appFooter.vue";
import AppHeader from "~/components/molecules/appHeader.vue";

@Component({
  components: { AppHeader, AppFooter },
})
export default class extends Vue {
  isLogined = !!this.$strapi.user;
  currentRoute = this.$router.currentRoute.name;

  @Watch("$route", { immediate: true, deep: true })
  onUrlChange(newVal: Route) {
    this.currentRoute = this.$router.currentRoute.name;
  }

  @Watch("$strapi", { immediate: true, deep: true })
  onLogin(newVal: strapi) {
    this.isLogined = !!this.$strapi.user;
  }
}
</script>
