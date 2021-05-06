<template>
  <div>
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
    <app-team-develop :is-logined="isLogined"></app-team-develop>
    <app-take-part></app-take-part>
    <Pricing></Pricing>
    <app-top-startups></app-top-startups>
    <app-testimonials
      :cards="testimonials"
      @slideRigth="slideRigth"
      @slideLeft="slideLeft"
    ></app-testimonials>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "nuxt-property-decorator";
import { Startup } from "~/models/Startup";
import { Challenge } from "~/models/Challenge";
import { Testimonial } from "~/models/Testimonial";
import { Technology } from "~/models/Technology";
import AppChallengesBlock from "~/components/organisms/landing/appChallengesBlock.vue";
import AppGetExperience from "~/components/organisms/landing/appGetExperience.vue";
import AppStartupsBlock from "~/components/organisms/landing/appStartupsBlock.vue";
import AppTeamDevelop from "~/components/organisms/landing/appTeamDevelop.vue";
import AppTakePart from "~/components/organisms/landing/appTakePart.vue";
import AppTopStartups from "~/components/organisms/landing/appTopStartups.vue";
import AppTestimonials from "~/components/organisms/landing/appTestimonials.vue";
import Pricing from "~/components/organisms/landing/pricing.vue";
import { goToPricing } from "~/assets/jshelper/scrollToPricing";
@Component({
  components: {
    AppGetExperience,
    AppStartupsBlock,
    AppChallengesBlock,
    AppTeamDevelop,
    AppTakePart,
    AppTopStartups,
    AppTestimonials,
    Pricing,
  },
})
export default class extends Vue {
  startups: Array<Startup> = [];
  challenges: Array<Challenge> = [];
  testimonials: Array<Testimonial> = [];
  technology: Array<Technology> = [];
  isLogined = !!this.$strapi.user;
  // data loaded here will be added during server rendering
  async asyncData({ $strapi, $startups, $challenges }) {
    const { startups } = await $startups();
    const { challenges } = await $challenges();
    const testimonials = await $strapi.find("testimonials");
    const technologies = await $strapi.find("technologies");
    // const notifications = await $strapi.find("notifications");
    // TODO change it
    // await Technologies.fetch();
    // await Specialisations.fetch();
    // console.log(startups);
    // console.log(challenges);
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

  @Watch("$strapi", { immediate: true, deep: true })
  onLogin() {
    this.isLogined = !!this.$strapi.user;
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

  mounted() {
    if (this.$router.currentRoute.fullPath === "/landing#pricing") {
      goToPricing();
    }
  }
}
</script>
