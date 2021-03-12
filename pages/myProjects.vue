<template>
  <div class="projects">
    <app-header></app-header>
    <my-projects :startups="startups"></my-projects>
    <app-footer></app-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AppHeader from "~/components/appHeader.vue";
import myProjects from "~/components/myprojects/myProjects.vue";
import AppFooter from "~/components/appFooter.vue";

@Component({
  components: {
    AppHeader,
    myProjects,
    AppFooter,
  },
})
export default class extends Vue {
  // data loaded here will be added during server rendering
  async asyncData({ $strapi }) {
    const startups = await $strapi.find("startups");
    return {
      startups,
    };
  }
}
</script>
