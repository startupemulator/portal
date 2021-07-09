<template>
  <div class="profile">
    <Profile
      :startups="startups"
      :technologies="myTechnologies"
      :user="user"
      :is-expert="isExpert"
      :profile="profile"
      :feedbacks="feedbacks"
      :user-id="userId"
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
    if ($strapi.user) {
      userId = $strapi.user.id;
      const profile = await $profile(userId);

      if (profile !== null) {
        isExpert = profile.is_expert;
      }
    }
    const feedbacks = await $feedbacks();
    const myTechnologies = profile.technologies;
    return {
      startups,
      myTechnologies,
      profile,
      feedbacks,
      user,
      userId,
      isExpert,
    };
  }
}
</script>
