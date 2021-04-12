<template>
  <div>
    <div class="createProject">
      <create-project></create-project>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import CreateProject from "~/components/organisms/startups/createProject.vue";

@Component({
  components: {
    CreateProject,
  },
  middleware: ["deny-unauthenticated"],
})
export default class extends Vue {}
</script>
