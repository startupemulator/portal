<template>
  <div class="experience">
    <Experience :technology="technology" :startup="startup"></Experience>
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
  technologies: Array<Technology> = [];
  technology: Array<Technology> = [];

  async asyncData({ $strapi, route }) {
    const technologies = await $strapi.find("technologies", [
      ["is_public", true],
    ]);
    const myTechnologies = await $strapi.find("technologies", [
      ["creator_id", $strapi.user.id],
    ]);
    const technology = await technologies;
    if (myTechnologies !== null) {
      myTechnologies.forEach((el) => technology.push(el));
    }
    const startup = await $strapi.find("startups", {
      slug: route.params.slug,
    });
    return {
      technology,
      startup,
    };
  }
}
</script>
