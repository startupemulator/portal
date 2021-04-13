<template>
  <div class="fullscreen">
    <participate-challenge :challenge="challenge"></participate-challenge>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import ParticipateChallenge from "~/components/organisms/participate/participateChallenge.vue";

@Component({
  components: {
    ParticipateChallenge,
  },
  middleware: ["deny-unauthenticated"],
})
export default class TakeChallenge extends Vue {
  async asyncData({ $strapi, route }) {
    const [challenge] = await $strapi.find("challenges");
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
