<template>
  <div class="startups-page">
    <app-header active="startups-list"></app-header>
    <startups-list
      :startups="startups"
      :technologies="technologies"
    ></startups-list>
    <app-footer></app-footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AppHeader from "~/components/molecules/appHeader.vue";
import StartupsList from "~/components/organisms/startups/startupsList.vue";
import AppFooter from "~/components/molecules/appFooter.vue";

@Component({
  components: {
    AppHeader,
    StartupsList,
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
