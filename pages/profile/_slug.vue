<template>
  <div class="profile">
    <pre style="color: #fff">{{ user }}</pre>
    <Profile :startups="startups" :technologies="technologies"></Profile>
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
  // async asyncData({ $strapi }) {
  //   const startups = await $strapi.find("startups");
  //   const technologies = await $strapi.find("technologies");
  //   const testimonials = await $strapi.find("testimonials");
  //   return {
  //     startups,
  //     technologies,
  //     testimonials,
  //   };
  // }
  async asyncData({ $technologies, $myStartups, $getUserBySlug, route }) {
    const user = await $getUserBySlug(route.params.slug);
    const startups = await $myStartups(user.id);
    const { technologies } = await $technologies();

    return {
      user,
      startups,
      technologies,
    };
  }
}
</script>
