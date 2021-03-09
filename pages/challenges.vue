<template>
  <div class="startups-page">
    <app-header></app-header>
    <Challenges></Challenges>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppHeader from "@/components/appHeader.vue";
import Challenges from "@/components/challenges/challenges.vue";
import AppFooter from "~/components/appFooter.vue";

export default {
  components: {
    AppHeader,
    Challenges,
    AppFooter,
  },
};
</script>
