<template>
  <div>
    <app-header></app-header>
    <app-get-experience></app-get-experience>
    <app-startups-block :cards="startups"></app-startups-block>
    <app-challenges-block :cards="challenges"></app-challenges-block>
    <app-team-develop></app-team-develop>
    <app-take-part></app-take-part>
    <app-top-startups></app-top-startups>
    <app-testimonials :cards="testimonials"></app-testimonials>
    <app-footer></app-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Startup } from "~/models/Startup";
import { Challenge } from "~/models/Challenge";
import { Testimonial } from "~/models/Testimonial";
import Specialisations from "~/store/modules/Specialisations";

import Technologies from "~/store/modules/Technologies";
import AppHeader from "~/components/molecules/appHeader";
import AppFooter from "~/components/molecules/appFooter";
import AppChallengesBlock from "~/components/organisms/landing/appChallengesBlock";
import AppGetExperience from "~/components/organisms/landing/appGetExperience";
import AppStartupsBlock from "~/components/organisms/landing/appStartupsBlock";
import AppTeamDevelop from "~/components/organisms/landing/appTeamDevelop";
import AppTakePart from "~/components/organisms/landing/appTakePart";
import AppTopStartups from "~/components/organisms/landing/appTopStartups";
import AppTestimonials from "~/components/organisms/landing/appTestimonials";

@Component({
  components: {
    AppHeader,
    AppGetExperience,
    AppStartupsBlock,
    AppChallengesBlock,
    AppTeamDevelop,
    AppTakePart,
    AppTopStartups,
    AppTestimonials,
    AppFooter,
  },
})
export default class extends Vue {
  startups: Array<Startup> = [];
  challenges: Array<Challenge> = [];
  testimonials: Array<Testimonial> = [];

  // data loaded here will be added during server rendering
  async asyncData({ $strapi }) {
    const startups = await $strapi.find("startups");
    const challenges = await $strapi.find("challenges");
    const testimonials = await $strapi.find("testimonials");
    // const notifications = await $strapi.find("notifications");
    // TODO change it
    await Technologies.fetch();
    await Specialisations.fetch();

    return {
      startups,
      challenges,
      testimonials,
      // notifications,
    };
  }

  get state() {
    return this.$store.state;
  }
}
</script>
