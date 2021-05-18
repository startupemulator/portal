<template>
  <div class="startups-page">
    <Spiner :loading="loading"></Spiner>
    <Startups
      :startups="startupsList"
      :technologies="technologies"
      :empty-state="emptyState"
      :autorizated="autorizated"
      @pickedTechnologies="filterStartupsList"
    ></Startups>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Spiner from "~/components/molecules/spiner.vue";
import Startups from "~/components/organisms/startups/startups.vue";

@Component({
  components: {
    Startups,
    Spiner,
  },
})
export default class extends Vue {
  // data loaded here will be added during server rendering
  emptyState = false;
  loading = false;
  autorizated = !!this.$strapi.user;

  // async asyncData({ $strapi }) {
  //   const startups = await $strapi.find("startups", [
  //     ["state", "in_progress"],
  //     ["state", "not_started"],
  //     ["state", "finished"],
  //   ]);
  //   const technologies = await $strapi.find("technologies", [
  //     ["is_public", true],
  //   ]);
  //   const startupsList = await startups;
  //   return {
  //     technologies,
  //     startupsList,
  //   };
  // }
  async asyncData({ $technologies, $startups, $challenges, $testimonials }) {
    const { startups } = await $startups();
    const { technologies } = await $technologies();
    const startupsList = await startups;
    return {
      startupsList,
      technologies,
    };
  }

  async filterStartupsList(data) {
    this.loading = true;
    const technologies = [];

    data.forEach((el) => technologies.push(el[1]));
    console.log(technologies);
    if (technologies.length > 0) {
      const newData = await this.$filterStartup(technologies);

      this.startupsList = newData;

      this.loading = false;
    } else {
      const { startups } = await this.$startups();
      this.startupsList = startups;
      this.loading = false;
    }
  }
}
</script>
