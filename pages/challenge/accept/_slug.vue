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
import { Challenge } from "../../../models/Challenge";
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
  challenge: Challenge;

  async asyncData({ route, $estimations, $challenge }) {
    const { estimations } = await $estimations();
    const challenge = await $challenge(route.params.slug);
    return { challenge, estimations };
  }

  async startChallenge(duration) {
    this.loading = true;
    try {
      const data = {
        user: this.$strapi.user.id,
        challenge: this.challenge.id,
        estimation: duration,
      };

      const sentRequest = await this.$strapi.create("user-challenges", data);
      if (sentRequest !== null) {
        this.loading = false;
        this.popupChallengeStarted = true;
      }
    } catch (e) {
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
