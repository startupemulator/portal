<template>
  <div class="startups-page">
    <app-header active="startups"></app-header>
    <start-ups></start-ups>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppHeader from "@/components/appHeader.vue";
import StartUps from "@/components/startups/StartUps.vue";
import AppFooter from "~/components/appFooter.vue";

export default {
  components: {
    AppHeader,
    StartUps,
    AppFooter,
  },
};
</script>
