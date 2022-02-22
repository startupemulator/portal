<template>
  <div class="startups-page">
    <Challenges
      :challenges="challengesList"
      :specialisations="specialisations"
      :empty-state="emptyState"
      :autorizated="autorizated"
      :user-id="userId"
      :is-expert="isExpert"
      :user-challenges="userChallenges"
      :feed-back-for-challenges="feedBackForChallenges"
      @filterCards="specialtyFilter"
      @difficultyFilter="difficultyFilter"
      @cleanFilter="cleanFilter"
    ></Challenges>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Spinner from "~/store/modules/Spinner";
import Challenges from "~/components/organisms/challenges/challenges.vue";
import { Challenge } from "~/models/Challenge";

@Component({
  components: {
    Challenges,
  },
})
export default class extends Vue {
  emptyState = false;
  autorizated = !!this.$strapi.user;
  userId = this.$strapi.user ? this.$strapi.user.id : "";
  difficultyLevel: Array<any> = [];
  pickedSpecialty: Array<any> = [];
  challengesList: Array<Challenge>;
  async asyncData({
    $strapi,
    $profile,
    $askFeedbacksForChallenges,
    $userChallengesByUserId,
    $challenges,
    $specialisations,
  }) {
    const { challenges } = await $challenges();
    const { specialisations } = await $specialisations();
    const challengesList = await challenges;
    let profile = [];
    let feedBackForChallenges = [];
    let userChallenges = [];
    let isExpert = false;
    specialisations.forEach((el) => (el.isChecked = false));
    if ($strapi.user) {
      profile = await $profile($strapi.user.id);
      if (profile !== null) {
        isExpert = profile.is_expert;
        feedBackForChallenges = await $askFeedbacksForChallenges();
        userChallenges = await $userChallengesByUserId($strapi.user.id);
      }
    }
    return {
      challenges,
      specialisations,
      challengesList,
      profile,
      feedBackForChallenges,
      isExpert,
      userChallenges,
    };
  }

  async filterCards() {
    try {
      Spinner.show();
      const filteredChallenges = await this.$challenges(
        this.difficultyLevel,
        this.pickedSpecialty
      );

      this.challengesList = filteredChallenges.challenges;
      this.emptyState = this.challengesList.length === 0;
    } catch (e) {
      console.error(e);
    } finally {
      Spinner.hide();
    }
  }

  cleanFilter() {
    this.pickedSpecialty = [];
    this.difficultyLevel = [];
    this.filterCards();
  }

  specialtyFilter(data) {
    this.pickedSpecialty = [];
    data.forEach((el) => this.pickedSpecialty.push(el.id));
    this.filterCards();
  }

  difficultyFilter(data) {
    this.difficultyLevel = [];
    data.forEach((el) => this.difficultyLevel.push(el.id));
    this.filterCards();
  }
}
</script>
