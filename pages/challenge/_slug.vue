<template>
  <div v-cloak class="startups-page">
    <!-- <pre style="color: #fff">{{ $strapi.user }} </pre> -->
    <ChallengePage
      :challenge="challenge"
      :user-challenges="userChallenges"
      :user-id="userId"
      :user-challenge="userChallenge"
      :previos-participaints="previosParticipaints"
      :profile="profile"
      :askfeedbacks="askfeedbacks"
      :directions="directions"
      :badges="badges"
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
    $directions,
    $badges,
  }) {
    const challenge = await $challenge(route.params.slug);
    const userChallenges = await $userChallengesById(challenge.id);
    const askfeedbacks = await $askFeedbacksByChallengeId(challenge.id);
    let profile = [];
    let userChallenge = [];
    let previosParticipaints = [];
    let directions = [];
    let badges = [];
    if ($strapi.user) {
      profile = await $profile($strapi.user.id);
      userChallenge = await $userChallengesByUserId($strapi.user.id);
      // need do if profile.expert - wait backend
      directions = await $directions();
      badges = await $badges();
    }
    if (askfeedbacks !== null && $strapi.user) {
      previosParticipaints = askfeedbacks.filter(
        (el) => +el.creator.id !== +$strapi.user.id
      );
    } else {
      previosParticipaints = askfeedbacks;
    }
    if (userChallenge !== undefined) {
      userChallenge = userChallenge.filter(
        (el) => el.challenge.id === challenge.id
      )[0];
    }

    return {
      challenge,
      userChallenges,
      userChallenge,
      profile,
      previosParticipaints,
      askfeedbacks,
      directions,
      badges,
    };
  }
}
</script>
