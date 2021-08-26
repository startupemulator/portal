<template>
  <div class="profile">
    <Profile
      :startups="startups"
      :technologies="myTechnologies"
      :user="user"
      :experiences="experiences"
      :publick-technologies="technologies"
      :is-expert="isExpert"
      :profile="profile"
      :feedbacks="feedbacks"
      :user-id="userId"
      :is-owner="isOwner"
      :my-startup-feedbacks="myStartupFeedbacks"
      :my-challenge-feedbacks="myChallengeFeedbacks"
      @updateData="updateData"
    ></Profile>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import Profile from "~/components/organisms/profile/profile.vue";

@Component({
  components: {
    Profile,
  },
})
export default class extends Vue {
  async asyncData({
    $myStartups,
    $feedbacks,
    $profileBySlug,
    $profile,
    route,
    $strapi,
    $experiences,
    $technologies,
  }) {
    const profile = await $profileBySlug(route.params.slug);

    const user = profile.user;
    let startups = await $myStartups(user.id);
    startups = startups.filter(
      (startup) =>
        startup.state === "not_started" ||
        startup.state === "in_progress" ||
        startup.state === "finished"
    );
    let userId = 0;
    let isExpert = false;
    let isOwner = false;
    if (profile !== null) {
      isExpert = profile.is_expert;
    }
    if ($strapi.user) {
      userId = $strapi.user.id;
      const myprofile = await $profile(userId);
      if (myprofile.slug === route.params.slug) {
        isOwner = true;
      }
    }
    const feedbacks = await $feedbacks();
    let myStartupFeedbacks;
    let myChallengeFeedbacks;
    if (feedbacks !== null) {
      // need find user by slug
      myStartupFeedbacks = feedbacks.filter(
        (el) =>
          +el.request.creator.id === +user.id && el.request.startup !== null
      );
      myChallengeFeedbacks = feedbacks.filter(
        (el) =>
          +el.request.creator.id === +user.id && el.request.challenge !== null
      );
    }
    const myTechnologies = profile.technologies;
    const { experiences } = await $experiences();
    const { technologies } = await $technologies();

    return {
      startups,
      myTechnologies,
      profile,
      feedbacks,
      user,
      userId,
      isExpert,
      isOwner,
      experiences,
      technologies,
      myStartupFeedbacks,
      myChallengeFeedbacks,
    };
  }

  async updateData() {
    this.profile = await this.$profile(this.$strapi.user.id);
    this.myTechnologies = this.profile.technologies;
    this.user = this.profile.user;
  }
}
</script>
