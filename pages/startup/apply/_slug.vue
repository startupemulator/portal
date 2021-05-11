<template>
  <div class="experience">
    <!-- <pre style="color: #fff"> {{ profile }}</pre> -->
    <BecomeToExpert
      :technology="technology"
      :startup="startup"
      :experiences="experiences"
      :specialisations="specialisations"
      :user-id="userId"
      :experience="profile.experience.id"
      :profile-id="profile.id"
    ></BecomeToExpert>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import BecomeToExpert from "~/components/organisms/team/applyToTeam.vue";
import { Technology } from "~/models/Technology";
import { Startup } from "~/models/Startup";
import { Experience } from "~/models/Experience";
import { Profile } from "~/models/Profile";
@Component({
  components: {
    BecomeToExpert,
  },
  middleware: ["deny-unauthenticated"],
})
export default class extends Vue {
  startups: Array<Startup> = [];
  technologies: Array<Technology> = [];
  technology: Array<Technology> = [];
  profile: Array<Profile>;
  experiences: Array<Experience>;

  userId = this.$strapi.user.id;
  // ---------
  startup: Startup;

  async asyncData({
    $myTechnologies,
    $technologies,
    $experiences,
    $startup,
    route,
    $strapi,
    $profile,
  }) {
    const startup = await $startup(route.params.slug);

    const { technologies } = await $technologies();
    const profile = await $profile($strapi.user.id);
    const myTechnologies = await $myTechnologies($strapi.user.id);
    let technology = [];
    if (myTechnologies !== null) {
      technology = technologies.concat(myTechnologies);
    }
    const specialisations = [];
    if (startup !== null) {
      startup.positions.forEach((el) => {
        specialisations.push(el.specialisation);
      });
    }
    const { experiences } = await $experiences();
    return {
      technology,
      startup,
      experiences,
      specialisations,
      profile,
    };
  }
}
</script>
