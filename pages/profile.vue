<template>
  <div class="profile">
    <app-header></app-header>
    <Profile :startups="startups" :technologies="technologies"></Profile>

    <app-footer></app-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AppHeader from "~/components/appHeader.vue";
import profile from "~/components/profile/profile.vue";
import AppFooter from "~/components/appFooter.vue";

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
    return {
      startups,
      technologies,
    };
  }
}
</script>
