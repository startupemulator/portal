<template>
  <div class="experience">
    <app-header></app-header>
    <experience></experience>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppHeader from "~/components/molecules/appHeader.vue";
import Experience from "~/components/organisms/team/applyToTeam.vue";
import AppFooter from "~/components/molecules/appFooter.vue";
export default {
  components: {
    AppHeader,
    Experience,
    AppFooter,
  },
};
</script>
