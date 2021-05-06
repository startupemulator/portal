<template>
  <div class="startups-page">
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
  middleware: ["deny-unauthenticated"],
})
export default class TakeChallenge extends Vue {
  challenge: Challenge;

  async asyncData({ $challenge, route }) {
    const challenge = await $challenge(route.params.slug);
    return { challenge };
  }
}
</script>
