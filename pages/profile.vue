<template>
  <div class="profile">
    <app-header active="profile"></app-header>

    <Profile
      :startups="startups"
      :technologies="technologies"
      :testimonials="testimonials"
    ></Profile>

    <app-footer></app-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AppHeader from "~/components/molecules/appHeader.vue";
import profile from "~/components/organisms/profile/profile.vue";
import AppFooter from "~/components/molecules/appFooter.vue";

@Component({
  components: {
    AppHeader,
    profile,
    AppFooter,
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
