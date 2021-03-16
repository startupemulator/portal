<template>
  <div>
    <app-header></app-header>
    <div class="createProject">
      <create-project></create-project>
    </div>
    <app-footer></app-footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AppFooter from "~/components/molecules/appFooter.vue";
import appHeader from "~/components/molecules/appHeader.vue";

import CreateProject from "~/components/organisms/startups/createProject.vue";

@Component({
  components: {
    appHeader,
    AppFooter,
    CreateProject,
  },
  middleware: ["deny-unauthenticated"],
})
export default class extends Vue {}
</script>
