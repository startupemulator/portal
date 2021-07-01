<template>
  <div class="startups-page">
    <Spiner :loading="loading"></Spiner>
    <!-- <pre style="color: #fff">{{ feedBackForChallenges }} </pre> -->

    <!-- <pre style="color: #fff">{{ feedBackForChallenges[1] }} </pre> -->
    <!-- <pre style="color: #fff">{{ userChallenges }} </pre> -->

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
import Spiner from "~/components/molecules/spiner.vue";
import Challenges from "~/components/organisms/challenges/challenges.vue";

@Component({
  components: {
    Challenges,
    Spiner,
  },
})
export default class extends Vue {
  emptyState = false;
  autorizated = !!this.$strapi.user;
  userId = this.$strapi.user ? this.$strapi.user.id : "";
  difficultyLevel: Array<any> = [];
  pickedSpecialty: Array<any> = [];
  loading = false;
  async asyncData({
    $strapi,
    $profile,
    $askFeedbacksForChallenges,
    $userChallengesByUserId,
  }) {
    const challenges = await $strapi.find("challenges");
    const specialisations = await $strapi.find("specialisations");
    const challengesList = await challenges;
    let profile = [];
    let feedBackForChallenges = [];
    let userChallenges = [];
    let isExpert = false;
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
    this.loading = true;
    const findCriterios = [];
    this.difficultyLevel.forEach((el) => findCriterios.push(el));
    this.pickedSpecialty.forEach((el) => findCriterios.push(el));

    const filterChallenges = await this.$strapi.find(
      "challenges",
      findCriterios
    );
    if (filterChallenges.length === 0) {
      this.emptyState = true;
    } else {
      this.emptyState = false;
    }
    if (filterChallenges !== null) {
      this.challengesList = filterChallenges;
      this.loading = false;
    }
  }

  cleanFilter() {
    this.pickedSpecialty = [];
    this.difficultyLevel = [];
    this.filterCards();
  }

  specialtyFilter(data) {
    this.pickedSpecialty = data;
    this.filterCards();
  }

  difficultyFilter(data) {
    this.difficultyLevel = data;
    this.filterCards();
  }
}
</script>
