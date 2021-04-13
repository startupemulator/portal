<template>
  <div class="projects">
    <MyProjectsCreateChallenges></MyProjectsCreateChallenges>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import MyProjectsCreateChallenges from "~/components/organisms/myprojects/myProjectsCreateChallenge.vue";

@Component({
  components: {
    MyProjectsCreateChallenges,
  },
})
export default class extends Vue {}
</script>
