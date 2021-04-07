<template>
  <div>
    <app-header></app-header>
    <app-get-experience></app-get-experience>
    <app-startups-block
      :cards="startups"
      :technology="technologies"
      @slideRigth="slideRigth"
      @slideLeft="slideLeft"
    ></app-startups-block>
    <app-challenges-block
      :cards="challenges"
      @slideRigth="slideRigth"
      @slideLeft="slideLeft"
    ></app-challenges-block>
    <app-team-develop></app-team-develop>
    <app-take-part></app-take-part>
    <Pricing></Pricing>
    <app-top-startups></app-top-startups>
    <app-testimonials
      :cards="testimonials"
      @slideRigth="slideRigth"
      @slideLeft="slideLeft"
    ></app-testimonials>
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

  slideRigth(data) {
    let el: any;
    switch (data) {
      case "startups":
        el = this.startups.pop();
        setTimeout(() => this.startups.unshift(el), 0);
        break;
      case "challenges":
        el = this.challenges.pop();
        setTimeout(() => this.challenges.unshift(el), 0);
        break;
      case "testimonials":
        el = this.testimonials.pop();
        setTimeout(() => this.testimonials.unshift(el), 0);
    }
  }

  slideLeft(data) {
    let el: any;
    switch (data) {
      case "startups":
        el = this.startups.shift();
        setTimeout(() => this.startups.push(el), 0);
        break;
      case "challenges":
        el = this.challenges.shift();
        setTimeout(() => this.challenges.push(el), 0);
        break;
      case "testimonials":
        el = this.testimonials.shift();
        setTimeout(() => this.testimonials.push(el), 0);
    }
  }
}
</script>
