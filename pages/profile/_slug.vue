<template>
  <div class="profile">
    <Profile
      :startups="startups"
      :technologies="technologies"
      :testimonials="testimonials"
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
  // data loaded here will be added during server rendering
  async asyncData({ $strapi }) {
    const startups = await $strapi.find("startups");
    const technologies = await $strapi.find("technologies");
    const testimonials = await $strapi.find("testimonials");
    return {
      startups,
      technologies,
      testimonials,
    };
  }
}
</script>
