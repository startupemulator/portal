<template>
  <div class="projects">
    <app-header active="my-projects"></app-header>
    <my-projects></my-projects>
    <app-footer></app-footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

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
export default class extends Vue {}
</script>
