<template>
  <div class="projects">
    <MyProjects :startups="startupsList"></MyProjects>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import myProjects from "~/components/organisms/myprojects/myProjects.vue";

@Component({
  components: {
    myProjects,
  },
})
export default class extends Vue {
  async asyncData({ $strapi }) {
    const startups = await $strapi.find("startups", [
      ["owner.id", $strapi.user.id],
    ]);
    const startupsList = await startups;
    return {
      startupsList,
    };
  }
}
</script>
