<template>
  <div class="experience">
    <app-header></app-header>
    <experience></experience>
    <app-footer></app-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AppHeader from "../../../components/appHeader.vue";
import Experience from "../../../components/team/applyToTeam.vue";
import AppFooter from "../../../components/appFooter.vue";

@Component({
  components: {
    AppHeader,
    Experience,
    AppFooter,
  },
})
export default class extends Vue {
  async asyncData({ $strapi, route }) {
    const [startup] = await $strapi.find("startups", {
      slug: route.params.slug,
    });
    return { startup };
  }
}
</script>
