<template>
  <div class="startups-page">
    <pre style="color: #fff">{{ userChallenges }} </pre>
    <ChallengePage :challenge="challenge"></ChallengePage>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import ChallengePage from "~/components/organisms/challenge/challenge.vue";
import { Challenge } from "~/models/Challenge";
@Component({
  components: {
    ChallengePage,
  },
})
export default class TakeChallenge extends Vue {
  challenge: Challenge;

  async asyncData({ $challenge, route, $userChallengesById }) {
    const challenge = await $challenge(route.params.slug);
    const userChallenges = await $userChallengesById("3");
    return { challenge, userChallenges };
  }
}
</script>
