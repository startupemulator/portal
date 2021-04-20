<template>
  <div class="experience">
    <Experience :technology="technology" :startups="startups"></Experience>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import Experience from "~/components/organisms/team/applyToTeam.vue";
import { Technology } from "~/models/Technology";
import { Startup } from "~/models/Startup";
@Component({
  components: {
    Experience,
  },
})
export default class extends Vue {
  startups: Array<Startup> = [];
  technology: Array<Technology> = [];
  async asyncData({ $strapi }) {
    const technology = await $strapi.find("technologies");
    const startups = await $strapi.find("startups");
    return {
      technology,
      startups,
    };
  }
}
</script>
