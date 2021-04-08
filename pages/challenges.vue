<template>
  <div class="startups-page">
    <app-header active="challenges"></app-header>

    <Challenges
      :challenges="challengesList"
      :specialisations="specialisations"
      @filterCards="filterCards"
    ></Challenges>

    <app-footer></app-footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AppHeader from "~/components/molecules/appHeader.vue";
import Challenges from "~/components/organisms/challenges/challenges.vue";
import AppFooter from "~/components/molecules/appFooter.vue";

@Component({
  components: {
    AppHeader,
    Challenges,
    AppFooter,
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

  filterCards($event) {
    console.log(this.challengesList);
    this.challengesList = [];
    console.log($event.currentTarget.name);
    this.challenges.forEach((item) => {
      item.specialisations.forEach((el) =>
        el.title === $event.currentTarget.name
          ? this.challengesList.push(item)
          : ""
      );
    });
  }
}
</script>
