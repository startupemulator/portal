<template>
  <div class="startups-page">
    <Startups
      :startups="strartupList"
      :technologies="technologies"
      @checkedTechnologyList="filterStartups"
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
  strartupList;
  async asyncData({ $strapi }) {
    const startups = await $strapi.find("startups");
    const technologies = await $strapi.find("technologies");
    const strartupList = await startups;
    return {
      startups,
      technologies,
      strartupList,
    };
  }

  filterStartups(checkedTechnologyList) {
    // const test = this.technologies.filter(item => item.title ===)
    console.log(this.startups);
  }
}
</script>
