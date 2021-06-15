<template>
  <div class="startups-page">
    <!-- <pre style="color: #fff">{{ userChallenge }} </pre> -->
    <ChallengePage
      :challenge="challenge"
      :user-challenges="userChallenges"
      :user-id="userId"
      :user-challenge="userChallenge"
      :previos-participaints="previosParticipaints"
      :profile="profile"
      :askfeedbacks="askfeedbacks"
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
    $profile,
    $askFeedbacksByChallengeId,
  }) {
    const challenge = await $challenge(route.params.slug);
    const userChallenges = await $userChallengesById(challenge.id);
    const askfeedbacks = await $askFeedbacksByChallengeId(challenge.id);
    let profile = [];
    let userChallenge = [];
    let previosParticipaints = [];
    if ($strapi.user) {
      profile = await $profile($strapi.user.id);
      userChallenge = await $userChallengesByUserId($strapi.user.id);
    }
    if (userChallenge !== undefined) {
      previosParticipaints = userChallenges.filter(
        (el) => el.id !== userChallenge.id
      );
    }
    return {
      challenge,
      userChallenges,
      userChallenge,
      profile,
      previosParticipaints,
      askfeedbacks,
    };
  }
}
</script>
