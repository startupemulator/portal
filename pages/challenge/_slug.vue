<template>
  <div class="startups-page">
    <!-- <pre style="color: #fff">{{ userChallenge }} </pre> -->
    <ChallengePage
      :challenge="challenge"
      :user-challenges="userChallenges"
      :user-id="userId"
      :user-challenge="userChallenge"
    ></ChallengePage>
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
  userId: string = this.$strapi.user ? this.$strapi.user.id : "";
  async asyncData({
    $challenge,
    route,
    $userChallengesById,
    $userChallengesByUserId,
    $strapi,
  }) {
    const challenge = await $challenge(route.params.slug);
    let userChallenges = await $userChallengesById(challenge.id);
    let userChallenge = [];
    console.log(userChallenge);
    if ($strapi.user) {
      userChallenge = await $userChallengesByUserId($strapi.user.id);
    }
    console.log(userChallenge);
    if (userChallenge !== undefined) {
      userChallenges = userChallenges.filter(
        (el) => el.id !== userChallenge.id
      );
    }
    return { challenge, userChallenges, userChallenge };
  }
}
</script>
