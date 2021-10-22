<template>
  <div>
    <app-get-experience></app-get-experience>
    <app-startups-block
      :cards="startups"
      :technology="technologies"
      :user-id="userId"
      :waiting-feedback="waitingFeedback"
      @slideRight="slideRight"
      @slideLeft="slideLeft"
    ></app-startups-block>
    <app-challenges-block
      :cards="challenges"
      :user-id="userId"
      :user-challenges="userChallenges"
      :feed-back-for-challenges="feedBackForChallenges"
      :is-expert="isExpert"
      @slideRight="slideRight"
      @slideLeft="slideLeft"
    ></app-challenges-block>
    <app-team-develop :is-logined="isLogined"></app-team-develop>
    <app-take-part></app-take-part>
    <Pricing></Pricing>
    <app-top-startups></app-top-startups>
    <app-testimonials
      :cards="testimonials"
      @slideRight="slideRight"
      @slideLeft="slideLeft"
    ></app-testimonials>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
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

  async asyncData({
    $technologies,
    $startups,
    $challenges,
    $testimonials,
    $askFeedbacksForChallenges,
    $userChallengesByUserId,
    $strapi,
    $profile,
    $askFeedbacksForStartup,
    route,
    history,
    $emailConfirmation,
    $loginPasswordless,
  }) {
    const { startups } = await $startups();
    const { challenges } = await $challenges();
    const { testimonials } = await $testimonials();
    const { technologies } = await $technologies();
    let feedBackForChallenges = [];
    let userChallenges = [];
    let isExpert = false;
    let waitingFeedback = [];
    if (route.query.confirmEmail && route.query.confirmEmail.length > 20) {
      const confirmEmail = await $emailConfirmation(route.query.confirmEmail);
      if (confirmEmail) {
        await loginUserWithJWT(confirmEmail);
      }
    }

    if (route.query.loginToken && route.query.loginToken.length > 20) {
      const loginPasswordLess = await $loginPasswordless(
        route.query.loginToken
      );
      if (loginPasswordLess !== null) {
        await loginUserWithJWT(loginPasswordLess);
      }
    }

    async function loginUserWithJWT(jwtUser) {
      const { user, jwt } = jwtUser;
      await $strapi.setUser(user);
      await $strapi.setToken(jwt);
    }

    let userId = null;
    if ($strapi.user) {
      feedBackForChallenges = await $askFeedbacksForChallenges();
      userChallenges = await $userChallengesByUserId($strapi.user.id);
      const userProfile = await $profile($strapi.user.id);
      if (userProfile !== null) {
        isExpert = userProfile.is_expert;
      }
      userId = $strapi.user ? $strapi.user.id : null;
    }
    let waitingFeedbackState;
    if (isExpert) {
      waitingFeedbackState = await $askFeedbacksForStartup();
      waitingFeedback = waitingFeedbackState.filter(
        (v, i, a) =>
          a.findIndex(
            (t) =>
              t.startup.id === v.startup.id && t.startup.state !== "finished"
          ) === i
      );
      if (isExpert) {
        const stateWaitingForFeedback = [];

        startups.forEach((el) => {
          if (
            waitingFeedbackState.some(
              (item) => item.startup.id === el.id && el.state !== "finished"
            )
          ) {
            stateWaitingForFeedback.push(el);
          }
        });
        waitingFeedback = stateWaitingForFeedback;
      }
    }

    return {
      startups,
      challenges,
      testimonials,
      technologies,
      feedBackForChallenges,
      userChallenges,
      isExpert,
      waitingFeedback,
      waitingFeedbackState,
      userId,
    };
  }

  @Watch("$strapi", { immediate: true, deep: true })
  onLogin() {
    this.isLogined = !!this.$strapi.user;
  }

  slideRight(data) {
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
    if (this.$router.currentRoute.fullPath === "/#pricing") {
      goToPricing();
    }
    if (this.$route.query.confirmEmail || this.$route.query.loginToken) {
      history.pushState({}, null, this.$route.path);
    }
  }
}
</script>
