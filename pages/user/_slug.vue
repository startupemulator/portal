<template>
  <div class="profile">
    <Profile
      :startups="startups"
      :technologies="myTechnologies"
      :user="user"
      :profile="profile"
      :feedbacks="feedbacks"
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
  async asyncData({ $myStartups, $feedbacks, $profileBySlug, route }) {
    const profile = await $profileBySlug(route.params.slug);

    const user = profile.user;
    let startups = await $myStartups(user.id);
    startups = startups.filter(
      (startup) =>
        startup.state === "not_started" ||
        startup.state === "in_progress" ||
        startup.state === "finished"
    );

    const feedbacks = await $feedbacks();
    const myTechnologies = profile.technologies;
    return {
      startups,
      myTechnologies,
      profile,
      feedbacks,
      user,
    };
  }
}
</script>
