<template>
  <div class="fullscreen">
    <app-header></app-header>
    <participate-challenge :challenge="challenge"></participate-challenge>
    <app-footer></app-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AppHeader from "~/components/molecules/appHeader.vue";
import ParticipateChallenge from "~/components/organisms/participate/participateChallenge.vue";
import AppFooter from "~/components/molecules/appFooter.vue";

@Component({
  components: {
    AppHeader,
    ParticipateChallenge,
    AppFooter,
  },
  middleware: ["deny-unauthenticated"],
})
export default class TakeChallenge extends Vue {
  async asyncData({ $strapi, route }) {
    const [challenge] = await $strapi.find("challenges", {
      slug: route.params.slug,
    });
    return { challenge };
  }
}
</script>

<style lang="scss" scoped>
@media (min-width: 1480px) {
  .fullscreen {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
  }
}
</style>
