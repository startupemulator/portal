<template>
  <div class="fullscreen">
    <Spiner :loading="loading"></Spiner>

    <ParticipateChallenge
      :challenge="challenge"
      :estimations="estimations"
      :popup-challenge-started="popupChallengeStarted"
      @startChallenge="startChallenge"
    ></ParticipateChallenge>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import ParticipateChallenge from "~/components/organisms/participate/participateChallenge.vue";
import Spiner from "~/components/molecules/spiner.vue";

@Component({
  components: {
    ParticipateChallenge,
    Spiner,
  },
  middleware: ["deny-unauthenticated"],
})
export default class TakeChallenge extends Vue {
  loading = false;
  popupChallengeStarted = false;
  async asyncData({ $strapi, route }) {
    const estimation = await $strapi.find("estimations");
    let estimations;
    if (estimation !== null) {
      estimations = estimation.sort(function (a, b) {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      });
    }
    const [challenge] = await $strapi.find("challenges", {
      slug: route.params.slug,
    });
    return { challenge, estimations };
  }

  async startChallenge(duration) {
    this.loading = true;
    try {
      const data = {
        challenge: this.challenge.id,
      };
      const sentRequest = await this.$strapi.create("requests", data);
      if (sentRequest !== null) {
        this.loading = false;
        this.popupChallengeStarted = true;
      }
    } catch (e) {
      console.error(e);
      this.loading = false;
      this.popupChallengeStarted = true;
    }
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
