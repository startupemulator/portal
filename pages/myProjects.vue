<template>
  <div class="projects">
<<<<<<< HEAD
    <app-header active="myProjects"></app-header>
    <my-projects :startups="startups"></my-projects>
    <app-footer></app-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
=======
    <app-header active="my-projects"></app-header>
    <my-projects></my-projects>
    <app-footer></app-footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

>>>>>>> 048ffafcf141e501853b9214a571411fa9108e6a
import AppHeader from "~/components/appHeader.vue";
import myProjects from "~/components/myprojects/myProjects.vue";
import AppFooter from "~/components/appFooter.vue";

@Component({
  components: {
    AppHeader,
    myProjects,
    AppFooter,
  },
})
<<<<<<< HEAD
export default class extends Vue {
  // data loaded here will be added during server rendering
  async asyncData({ $strapi }) {
    const startups = await $strapi.find("startups");
    return {
      startups,
    };
  }
}
=======
export default class extends Vue {}
>>>>>>> 048ffafcf141e501853b9214a571411fa9108e6a
</script>
