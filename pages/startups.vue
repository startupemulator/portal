<template>
  <div class="startups-page">
    <app-header active="startups"></app-header>
    <start-ups></start-ups>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppHeader from "~/components/molecules/appHeader";
import StartUps from "~/components/organisms/startups/startUps";
import AppFooter from "~/components/molecules/appFooter";

export default {
  components: {
    AppHeader,
    StartUps,
    AppFooter,
  },
};
</script>
