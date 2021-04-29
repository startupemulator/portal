<template>
  <div class="startups-page">
    <Startups
      :startups="startupsList"
      :technologies="technologies"
      @pickedTechnologies="filterStartupsList"
    ></Startups>
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
    const startups = await $strapi.find("startups", [
      ["state", "in_progress"],
      ["state", "not_started"],
      ["state", "finished"],
    ]);
    const technologies = await $strapi.find("technologies");
    const startupsList = await startups;
    return {
      technologies,
      startupsList,
    };
  }

  async filterStartupsList(data) {
    const filtredStartups = await this.$strapi.find("startups", data);
    this.startupsList = filtredStartups;
    if (filtredStartups.lenght === 0) {
      this.startupsList = this.startups;
    }
  }
}
</script>
