<template>
  <div class="projects">
    <MyProjects :startups="startupsList" :user-id="userId"></MyProjects>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import myProjects from "~/components/organisms/myprojects/myProjects.vue";

@Component({
  components: {
    myProjects,
  },
  middleware: ["deny-unauthenticated"],
})
export default class extends Vue {
  userId: Number = this.$strapi.user.id;
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
