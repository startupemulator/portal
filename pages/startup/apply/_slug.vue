<template>
  <div class="experience">
    <app-header></app-header>
    <experience :startup="startup"></experience>
    <app-footer></app-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AppHeader from "~/components/molecules/appHeader.vue";
import Experience from "~/components/organisms/team/applyToTeam.vue";
import AppFooter from "~/components/molecules/appFooter.vue";
import { Startup } from "~/models/Startup";

@Component({
  components: {
    AppHeader,
    Experience,
    AppFooter,
  },
})
export default class extends Vue {
  startup: Startup;
  async asyncData({ $strapi, route }) {
    const [startup] = await $strapi.find("startups", {
      slug: route.params.slug,
    });
    return { startup };
  }
}
</script>
