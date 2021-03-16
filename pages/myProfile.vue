<template>
  <div class="profile">
    <app-header active="profile"></app-header>
    <my-profile
      :startups="startups"
      :technologies="technologies"
      @copyBaseUri="copyBaseUri"
    ></my-profile>

    <app-footer></app-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AppHeader from "~/components/appHeader.vue";
import myProfile from "~/components/profile/myProfile.vue";
import AppFooter from "~/components/appFooter.vue";

@Component({
  components: {
    AppHeader,
    myProfile,
    AppFooter,
  },
  middleware: ["deny-unauthenticated"],
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

  // transfer to "store" for correct work?
  copyBaseUri() {
    const baseUri = window.location.href;
    // navigator.clipboard.writeText(baseUri);
    console.log(baseUri);
  }
}
</script>
