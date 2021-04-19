<template>
  <div class="profile">
    <my-profile
      :startups="startups"
      :technologies="technologies"
      :testimonials="testimonials"
      @copyBaseUri="copyBaseUri"
    ></my-profile>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import myProfile from "~/components/organisms/profile/myProfile.vue";

@Component({
  components: {
    myProfile,
  },
  middleware: ["deny-unauthenticated"],
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

  async copyBaseUri() {
    try {
      await navigator.clipboard.writeText(location.href);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }
}
</script>
