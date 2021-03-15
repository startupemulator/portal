<template>
  <div class="challenges-page">
    <app-header active="challenges"></app-header>

    <challenges
      :challenges="challenges"
      :specialisations="specialisations"
    ></challenges>
    <app-footer></app-footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AppHeader from "@/components/appHeader.vue";
import Challenges from "@/components/challenges/challenges.vue";
import AppFooter from "~/components/appFooter.vue";

@Component({
  components: {
    AppHeader,
    Challenges,
    AppFooter,
  },
})
export default class extends Vue {
  // data loaded here will be added during server rendering
  async asyncData({ $strapi }) {
    const challenges = await $strapi.find("challenges");
    const specialisations = await $strapi.find("specialisations");
    return {
      challenges,
      specialisations,
    };
  }
}
</script>
