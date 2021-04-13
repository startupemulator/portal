<template>
  <div class="startups-page">
    <startups-list
      :startups="startups"
      :technologies="technologies"
    ></startups-list>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import StartupsList from "~/components/organisms/startups/startupsList.vue";

@Component({
  components: {
    StartupsList,
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
