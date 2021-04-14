<template>
  <div class="startups-page">
    <Startups :startups="startups" :technologies="technologies"></Startups>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import Startups from "~/components/organisms/startups/startups.vue";

@Component({
  components: {
    Startups,
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
