<template>
  <div>
    <app-header></app-header>

    <app-get-experience></app-get-experience>
    <app-startups-block
      :cards="startups"
      :technology="technologies"
    ></app-startups-block>
    <app-challenges-block :cards="challenges"></app-challenges-block>
    <app-team-develop></app-team-develop>
    <app-take-part></app-take-part>
    <Pricing></Pricing>
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
import { Technology } from "~/models/Technology";
import AppHeader from "~/components/molecules/appHeader.vue";
import AppFooter from "~/components/molecules/appFooter.vue";
import AppChallengesBlock from "~/components/organisms/landing/appChallengesBlock.vue";
import AppGetExperience from "~/components/organisms/landing/appGetExperience.vue";
import AppStartupsBlock from "~/components/organisms/landing/appStartupsBlock.vue";
import AppTeamDevelop from "~/components/organisms/landing/appTeamDevelop.vue";
import AppTakePart from "~/components/organisms/landing/appTakePart.vue";
import AppTopStartups from "~/components/organisms/landing/appTopStartups.vue";
import AppTestimonials from "~/components/organisms/landing/appTestimonials.vue";
import Pricing from "~/components/molecules/pricing.vue";
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
    Pricing,
  },
})
export default class extends Vue {
  startups: Array<Startup> = [];
  challenges: Array<Challenge> = [];
  testimonials: Array<Testimonial> = [];
  technology: Array<Technology> = [];

  // data loaded here will be added during server rendering
  async asyncData({ $strapi }) {
    const startups = await $strapi.find("startups");
    const challenges = await $strapi.find("challenges");
    const testimonials = await $strapi.find("testimonials");
    const technologies = await $strapi.find("technologies");
    // const notifications = await $strapi.find("notifications");
    // TODO change it
    // await Technologies.fetch();
    // await Specialisations.fetch();

    return {
      startups,
      challenges,
      testimonials,
      technologies,
      // notifications,
    };
  }

  get state() {
    return this.$store.state;
  }
}
</script>
