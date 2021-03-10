<template>
  <div class="projects">
    <app-header></app-header>
    <my-projects></my-projects>
    <app-footer></app-footer>
  </div>
</template>
//
<script>
import AppHeader from "@/components/appHeader.vue";
import myProjects from "@/components/myprodjects/myProdjects";
import AppFooter from "~/components/appFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    myProjects,
  },
};
</script>

//
<script lang="ts">
// import { Context } from "@nuxt/types";
// import { Component, Vue } from "nuxt-property-decorator";

// import AppHeader from "~/components/appHeader.vue";
// import myProjects from "~/components/myprojects/myProjects.vue";
// import AppFooter from "~/components/appFooter.vue";
// import Startups from "~/store/modules/Startups";

// @Component({
//   components: {
//     AppHeader,
//     myProjects,
//     AppFooter,
//   },
// })
// export default class LandingPage extends Vue {
//   name: string = "";

//   // data loaded here will be added during server rendering
//   async asyncData(context: Context) {
//     const startups = await context.$strapi.find("startups");
//     Startups.setStartups(startups);
//   }

//   get state() {
//     return this.$store.state;
//   }
// }
//
</script>
