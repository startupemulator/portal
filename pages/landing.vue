<template>
  <div>
    <app-header></app-header>
    <app-get-experience></app-get-experience>
    <app-startups-block :cards="startups"></app-startups-block>
    <app-challenges-block :cards="challenges"></app-challenges-block>
    <app-team-develop></app-team-develop>
    <app-take-part></app-take-part>
    <app-top-startups></app-top-startups>
    <app-practicants :cards="testimonials"></app-practicants>
    <app-footer></app-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Startup } from "../models/Startup";
import { Challenge } from "../models/Challenge";
import { Testimonial } from "../models/Testimonial";
import Specialisations from "../store/modules/Specialisations";
import AppHeader from "~/components/appHeader.vue";
import AppGetExperience from "~/components/homePage/appGetExperience.vue";
import AppStartupsBlock from "~/components/homePage/appStartupsBlock.vue";
import AppChallengesBlock from "~/components/homePage/appChallengesBlock.vue";
import AppTeamDevelop from "~/components/homePage/appTeamDevelop.vue";
import AppTakePart from "~/components/homePage/appTakePart.vue";
import AppTopStartups from "~/components/homePage/appTopStartups.vue";
import AppPracticants from "~/components/homePage/appPracticants.vue";
import AppFooter from "~/components/appFooter.vue";
import Technologies from "~/store/modules/Technologies";

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
  startups: Array<Startup> = [];
  challenges: Array<Challenge> = [];
  testimonials: Array<Testimonial> = [];

  // data loaded here will be added during server rendering
  async asyncData({ $strapi }) {
    const startups = await $strapi.find("startups");
    const challenges = await $strapi.find("challenges");
    const testimonials = await $strapi.find("testimonials");
    // TODO change it
    await Technologies.fetch();
    await Specialisations.fetch();

    return {
      startups,
      challenges,
      testimonials,
    };
  }

  get state() {
    return this.$store.state;
  }
}
</script>
