<template>
  <div class="projects">
    <app-header></app-header>
    <my-projects></my-projects>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppHeader from "@/components/appHeader.vue";
import myProjects from "@/components/myprodjects/myProdjects";
import AppFooter from "~/components/appFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    myProjects,
  },
};
</script>
