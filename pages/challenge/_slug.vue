<template>
  <div>
    <div class="createProject">
      <create-project></create-project>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import CreateProject from "~/components/organisms/startups/createProject.vue";

@Component({
  components: {
    CreateProject,
  },
  middleware: ["deny-unauthenticated"],
})
export default class TakeChallenge extends Vue {
  async asyncData({ $strapi, route }) {
    const [challenge] = await $strapi.find("challenges", {
      slug: route.params.slug,
    });
    return { challenge };
  }
}
</script>
