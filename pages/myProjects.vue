<template>
  <div class="projects">
    <Spiner :loading="loading"></Spiner>

    <MyProjects
      :key="updateFlag"
      :startups="myStartups"
      :user-id="userId"
      @deleteDraft="deleteDraft"
    ></MyProjects>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import Spiner from "~/components/molecules/spiner.vue";

import myProjects from "~/components/organisms/myprojects/myProjects.vue";

@Component({
  components: {
    myProjects,
    Spiner,
  },
  middleware: ["deny-unauthenticated"],
})
export default class extends Vue {
  userId: Number = this.$strapi.user.id;
  updateFlag = 0;
  loading = false;

  async asyncData({ $myStartups, $strapi }) {
    const myStartups = await $myStartups($strapi.user.id);
    return {
      myStartups,
    };
  }

  async deleteDraft(id) {
    this.loading = true;
    const deleteDraft = await this.$deleteDraft(id);
    if (deleteDraft !== null) {
      this.myStartups = await this.$myStartups(this.$strapi.user.id);
      this.loading = false;
    }
  }

  @Watch("myStartups")
  startupUpdate() {
    this.updateFlag += 1;
  }
}
</script>
