<template>
  <div class="startups-page">
    <StartupPage
      :startup="startup"
      :feedbacks="feedbacks"
      :is-owner="isOwner"
    ></StartupPage>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import StartupPage from "~/components/organisms/startup/startup.vue";
import { Startup } from "~/models/Startup";

@Component({
  components: {
    StartupPage,
  },
})
export default class TakeStartup extends Vue {
  startup: Startup;
  isOwner = false;

  async asyncData({ $startup, $feedbacks, route }) {
    const startup = await $startup(route.params.slug);
    const feedbacks = await $feedbacks();
    return { startup, feedbacks };
  }

  mounted() {
    if (this.$strapi.user && +this.$strapi.user.id === +this.startup.owner.id) {
      this.isOwner = true;
    }
  }
}
</script>
