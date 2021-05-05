<template>
  <div class="experience">
    <BecomeToExpert
      :technology="technology"
      :startup="startup"
      :experiences="experiences"
      :specialisations="specialisations"
    ></BecomeToExpert>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import BecomeToExpert from "~/components/organisms/team/applyToTeam.vue";
import { Technology } from "~/models/Technology";
import { Startup } from "~/models/Startup";
import { Experience } from "~/models/Experience";
@Component({
  components: {
    BecomeToExpert,
  },
})
export default class extends Vue {
  startups: Array<Startup> = [];
  technologies: Array<Technology> = [];
  technology: Array<Technology> = [];
  experiences: Array<Experience>;
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
    const specialisationsList = [];
    if (startup !== null) {
      await startup.forEach((el, i) => {
        el.positions.forEach((item, i) =>
          specialisationsList.push(["id", item.specialisation])
        );
      });
    }

    const specialisations = await $strapi.find(
      "specialisations",
      specialisationsList
    );
    const experience = await $strapi.find("experiences");
    let experiences;
    if (experience !== null) {
      experiences = experience.sort(function (a, b) {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      });
    }
    return {
      technology,
      specialisations,
      startup,
      experiences,
      specialisationsList,
    };
  }
}
</script>
