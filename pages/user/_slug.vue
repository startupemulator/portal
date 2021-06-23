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
    console.log(profile);
    const user = profile.user;
    const startups = await $myStartups(user.id);
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
