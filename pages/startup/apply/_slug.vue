<template>
  <div class="experience">
    <experience :startup="startup"></experience>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Experience from "~/components/organisms/team/applyToTeam.vue";
import { Startup } from "~/models/Startup";

@Component({
  components: {
    Experience,
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
