<template>
  <div class="experience">
    <app-header></app-header>
    <experience></experience>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppHeader from "@/components/appHeader.vue";
import Experience from "@/components/team/applyToTeam.vue";
import AppFooter from "~/components/appFooter.vue";
export default {
  components: {
    AppHeader,
    Experience,
    AppFooter,
  },
};
</script>
