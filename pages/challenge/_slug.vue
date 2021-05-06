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
})
export default class TakeChallenge extends Vue {
  challenge: Challenge;
  async asyncData({ $strapi, route }) {
    const [challenge] = await $strapi.find("challenges", {
      slug: route.params.slug,
    });
    return { challenge };
  }
}
</script>
