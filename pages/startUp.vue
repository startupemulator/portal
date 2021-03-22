<template>
  <div class="startups-page">
    <App-header></App-header>

    <Start-up :startups="startups"></Start-up>
    <App-footer></App-footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AppHeader from "~/components/molecules/appHeader.vue";
import StartUp from "~/components/organisms/startup/startUp.vue";
import AppFooter from "~/components/molecules/appFooter.vue";

@Component({
  components: {
    AppHeader,
    StartUp,
    AppFooter,
  },
})
export default class extends Vue {
  // data loaded here will be added during server rendering
  async asyncData({ $strapi }) {
    const startups = await $strapi.find("startups");

    return {
      startups,
    };
  }
}
</script>
