<template>
  <div class="projects">
    <MyProjects></MyProjects>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import myProjects from "~/components/organisms/myprojects/myProjects.vue";

@Component({
  components: {
    myProjects,
  },
})
export default class extends Vue {}
</script>
