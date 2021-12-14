<template>
  <div>
    <App-Get-Experience></App-Get-Experience>

    <App-Startups-Block
      :cards="LandingPage.startups"
      @slideRight="LandingPage.moveRightStartups()"
      @slideLeft="LandingPage.moveLeftStartups()"
    ></App-Startups-Block>
    <App-Challenges-Block
      :cards="LandingPage.challenges"
      :user-id="$strapi.user ? $strapi.user.id : null"
      @slideRight="LandingPage.moveRightChallenges()"
      @slideLeft="LandingPage.moveLeftChallenges()"
    ></App-Challenges-Block>
    <App-Team-Develop :is-logined="!!$strapi.user"></App-Team-Develop>
    <App-Take-Part></App-Take-Part>
    <Pricing ref="pricing"></Pricing>
    <App-Top-Startups></App-Top-Startups>
    <App-Testimonials
      :cards="LandingPage.testimonials"
      @slideRight="LandingPage.moveRightTestimonials()"
      @slideLeft="LandingPage.moveLeftTestimonials()"
    ></App-Testimonials>
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
