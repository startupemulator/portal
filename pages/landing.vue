<template>
  <div>
    <app-header></app-header>
    <app-get-experience></app-get-experience>
    <app-startups-block :cards="state.Startups.cards"></app-startups-block>
    <app-challenges-block
      :cards="state.Challenges.cards"
    ></app-challenges-block>
    <app-team-develop></app-team-develop>
    <app-take-part></app-take-part>
    <app-top-startups></app-top-startups>
    <app-practicants></app-practicants>
    <app-footer> </app-footer>
  </div>
</template>

<script lang="ts">
import { Context } from "@nuxt/types";
import { Component, Vue } from "nuxt-property-decorator";
import Challenges from "../store/modules/Challenges";
import AppHeader from "~/components/appHeader.vue";
import AppGetExperience from "~/components/homePage/appGetExperience.vue";
import AppStartupsBlock from "~/components/homePage/appStartupsBlock.vue";
import AppChallengesBlock from "~/components/homePage/appChallengesBlock.vue";
import AppTeamDevelop from "~/components/homePage/appTeamDevelop.vue";
import AppTakePart from "~/components/homePage/appTakePart.vue";
import AppTopStartups from "~/components/homePage/appTopStartups.vue";
import AppPracticants from "~/components/homePage/appPracticants.vue";
import AppFooter from "~/components/appFooter.vue";
import Startups from "~/store/modules/Startups";

@Component({
  components: {
    AppHeader,
    AppGetExperience,
    AppStartupsBlock,
    AppChallengesBlock,
    AppTeamDevelop,
    AppTakePart,
    AppTopStartups,
    AppPracticants,
    AppFooter,
  },
})
export default class LandingPage extends Vue {
  name: string = "";

  // data loaded here will be added during server rendering
  async asyncData(context: Context) {
    const startups = await context.$strapi.find("startups");
    Startups.setStartups(startups);

    const challenges = await context.$strapi.find("challenges");
    Challenges.setChallenges(challenges);
  }

  get state() {
    return this.$store.state;
  }
}
</script>
