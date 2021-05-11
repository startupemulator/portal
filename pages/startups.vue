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

  async asyncData({ $strapi }) {
    const startups = await $strapi.find("startups", [
      ["state", "in_progress"],
      ["state", "not_started"],
      ["state", "finished"],
    ]);
    const technologies = await $strapi.find("technologies", [
      ["is_public", true],
    ]);
    const startupsList = await startups;
    return {
      technologies,
      startupsList,
    };
  }

  async filterStartupsList(data) {
    this.loading = true;
    if (data === undefined) {
      const startups = await this.$strapi.find("startups", [
        ["state", "in_progress"],
        ["state", "not_started"],
        ["state", "finished"],
      ]);
      if (startups !== null) {
        this.startupsList = startups;
        this.loading = false;
        this.emptyState = false;
      }
    } else {
      const filtredStartups = await this.$strapi.find("startups", data);
      this.startupsList = filtredStartups;
      if (this.startupsList.length === 0) {
        this.emptyState = true;
      } else {
        this.emptyState = false;
      }
      if (filtredStartups) {
        this.loading = false;
      }
    }
  }
}
</script>
