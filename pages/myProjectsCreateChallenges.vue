<template>
  <div class="projects">
    <app-header active="my-projects"></app-header>
    <MyProjectsCreateChallenges></MyProjectsCreateChallenges>
    <app-footer></app-footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import AppHeader from "~/components/molecules/appHeader.vue";
import MyProjectsCreateChallenges from "~/components/organisms/myprojects/myProjectsCreateChallenge.vue";
import AppFooter from "~/components/molecules/appFooter.vue";

@Component({
  components: {
    AppHeader,
    MyProjectsCreateChallenges,
    AppFooter,
  },
})
export default class extends Vue {}
</script>
