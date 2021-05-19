<template>
  <div class="profile">
    <pre style="color: #fff">    {{ feedbacks }} </pre>
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
  async asyncData({
    $myStartups,
    $getUserBySlug,
    $profile,
    $feedbacks,
    route,
  }) {
    const user = await $getUserBySlug(route.params.slug);
    const startups = await $myStartups(user.id);
    const feedbacks = await $feedbacks();
    const profile = await $profile(user.id);
    const myTechnologies = profile.technologies;
    return {
      user,
      startups,
      myTechnologies,
      profile,
      feedbacks,
    };
  }
}
</script>
