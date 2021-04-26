<template>
  <div class="startups-page">
    <Startups
      :startups="technologiesList"
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
    const startups = await $strapi.find("startups");
    const technologies = await $strapi.find("technologies");
    const technologiesList = await startups;
    return {
      technologies,
      technologiesList,
    };
  }

  async filterStartupsList(data) {
    const filtredStartups = await this.$strapi.find("startups", data);
    this.technologiesList = filtredStartups;
    if (filtredStartups.lenght === 0) {
      this.technologiesList = this.startups;
    }
  }
}
</script>
