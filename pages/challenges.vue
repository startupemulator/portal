<template>
  <div class="startups-page">
    <Challenges
      :challenges="challengesList"
      :specialisations="specialisations"
      @filterCards="specialtyFilter"
      @difficultyFilter="difficultyFilter"
    ></Challenges>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import Challenges from "~/components/organisms/challenges/challenges.vue";

@Component({
  components: {
    Challenges,
  },
})
export default class extends Vue {
  // data loaded here will be added during server rendering
  async asyncData({ $strapi }) {
    const challenges = await $strapi.find("challenges");
    const specialisations = await $strapi.find("specialisations");
    const challengesList = await challenges;
    return {
      challenges,
      specialisations,
      challengesList,
    };
  }

  difficultyLevel: Array<any> = [];
  pickedSpecialty: Array<any> = [];

  async filterCards() {
    const findCriterios = [];
    this.difficultyLevel.forEach((el) => findCriterios.push(el));
    this.pickedSpecialty.forEach((el) => findCriterios.push(el));

    const filterChallenges = await this.$strapi.find(
      "challenges",
      findCriterios
    );
    this.challengesList = filterChallenges;
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
