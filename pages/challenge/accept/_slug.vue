<template>
  <div class="fullscreen">
    <Participate-Challenge
      :challenge="challenge"
      :estimations="estimations"
      :popup-challenge-started="popupChallengeStarted"
      @startChallenge="startChallenge"
    ></Participate-Challenge>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Challenge } from "../../../models/Challenge";
import Spinner from "../../../store/modules/Spinner";
import ParticipateChallenge from "~/components/organisms/participate/participateChallenge.vue";

@Component({
  components: {
    ParticipateChallenge,
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
    Spinner.show();
    try {
      const data = {
        user: this.$strapi.user.id,
        challenge: this.challenge.id,
        estimation: duration,
      };

      const sentRequest = await this.$strapi.create("user-challenges", data);
      if (sentRequest !== null) {
        Spinner.hide();
        this.popupChallengeStarted = true;
      }
    } catch (e) {
      Spinner.hide();
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
