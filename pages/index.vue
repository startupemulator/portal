<template>
  <div>
    <app-get-experience></app-get-experience>

    <app-startups-block
      :cards="LandingPage.startups"
      @slideRight="LandingPage.moveRightStartups()"
      @slideLeft="LandingPage.moveLeftStartups()"
    ></app-startups-block>
    <app-challenges-block
      :cards="LandingPage.challenges"
      :user-id="$strapi.user ? $strapi.user.id : null"
      @slideRight="LandingPage.moveRightChallenges()"
      @slideLeft="LandingPage.moveLeftChallenges()"
    ></app-challenges-block>
    <app-team-develop :is-logined="!!$strapi.user"></app-team-develop>
    <app-take-part></app-take-part>
    <Pricing ref="pricing"></Pricing>
    <app-top-startups></app-top-startups>
    <app-testimonials
      :cards="LandingPage.testimonials"
      @slideRight="LandingPage.moveRightTestimonials()"
      @slideLeft="LandingPage.moveLeftTestimonials()"
    ></app-testimonials>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { LandingPage } from "../store";
import AppChallengesBlock from "~/components/organisms/landing/appChallengesBlock.vue";
import AppGetExperience from "~/components/organisms/landing/appGetExperience.vue";
import AppStartupsBlock from "~/components/organisms/landing/appStartupsBlock.vue";
import AppTeamDevelop from "~/components/organisms/landing/appTeamDevelop.vue";
import AppTakePart from "~/components/organisms/landing/appTakePart.vue";
import AppTopStartups from "~/components/organisms/landing/appTopStartups.vue";
import AppTestimonials from "~/components/organisms/landing/appTestimonials.vue";
import Pricing from "~/components/organisms/landing/pricing.vue";

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
  scrollToTop: false,
})
export default class extends Vue {
  LandingPage;

  constructor() {
    super();
    this.LandingPage = LandingPage;
  }

  async asyncData(context) {
    await LandingPage.init(context);
    await LandingPage.confirmEmail(context);
    await LandingPage.passwordlessLogin(context);
  }

  mounted() {
    if (this.$router.currentRoute.fullPath === "/#pricing") {
      this.$refs.pricing?.$el?.scrollIntoView({ behavior: "smooth" });
    }
    if (this.$route.query.confirmEmail || this.$route.query.loginToken) {
      this.$router.push({ path: "/" });
    }
  }
}
</script>
