<template>
  <div v-cloak class="startups-page">
    <ChallengePage
      :key="updateKey"
      :challenge="updatableChallenge"
      :user-challenges="userChallenges"
      :user-id="userId"
      :user-challenge="userChallenge"
      :previos-participaints="previosParticipaints"
      :profile="profile"
      :askfeedbacks="updatableaskfeedbacks"
      :directions="directions"
      :badges="badges"
      :is-super-admin="isSuperAdmin"
      @requestIsSend="requestIsSend"
    ></ChallengePage>
    <Spiner :loading="loading"></Spiner>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import ChallengePage from "~/components/organisms/challenge/challenge.vue";
import Spiner from "~/components/molecules/spiner.vue";
import { scrollToHeader } from "~/assets/jshelper/scrollToHeader.js";
@Component({
  components: {
    ChallengePage,
    Spiner,
  },
})
export default class TakeChallenge extends Vue {
  challenge!: Array<any>;
  userId: string = this.$strapi.user ? this.$strapi.user.id : "";
  title: string;
  updateKey = 0;
  loading = false;

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

    const updatableChallenge = challenge;
    const updatableaskfeedbacks = askfeedbacks;
    const title = challenge.title;
    let profile = [];
    let userChallenge = [];
    let previosParticipaints = [];
    let directions = [];
    let badges = [];
    let isSuperAdmin = false;
    if ($strapi.user) {
      profile = await $profile($strapi.user.id);
      if (profile !== null && profile.gardenkeeper !== null) {
        isSuperAdmin = profile.gardenkeeper;
      }
      userChallenge = await $userChallengesByUserId($strapi.user.id);
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
      userChallenges,
      userChallenge,
      profile,
      previosParticipaints,
      updatableaskfeedbacks,
      directions,
      badges,
      updatableChallenge,
      title,
      challenge,
      isSuperAdmin,
    };
  }

  async requestIsSend() {
    this.loading = true;
    try {
      this.updatableChallenge = await this.$challenge(this.$route.params.slug);
      this.updatableaskfeedbacks = await this.$askFeedbacksByChallengeId(
        this.updatableChallenge.id
      );
      if (this.updatableaskfeedbacks !== null && this.$strapi.user) {
        this.previosParticipaints = this.updatableaskfeedbacks.filter(
          (el) => +el.creator.id !== +this.$strapi.user.id
        );
      } else {
        this.previosParticipaints = this.askfeedbacks;
      }
      if (this.updatableChallenge !== null) {
        this.updateKey += 1;
        scrollToHeader();
        this.requestFeedbackNotification();
      }
      this.loading = false;
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }

  async requestFeedbackNotification() {
    try {
      const recipiensts = await this.$expertProfiles();
      if (recipiensts !== null) {
        this.createNotification(recipiensts);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async createNotification(recipiensts) {
    const comment = "Requested feedback";
    const link = this.challenge.slug;
    try {
      const newNotification = await this.$createNotificationForChallenge(
        this.userId,
        comment,
        link,
        "feedback",
        this.challenge.id
      );
      if (newNotification !== null) {
        for (const recipienst of recipiensts) {
          await this.$createUserNotification(
            recipienst.user.id,
            newNotification.id
          );
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  head() {
    return {
      title: this.title,
    };
  }
}
</script>
