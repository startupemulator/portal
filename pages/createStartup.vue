<template>
  <div>
    <div class="createProject">
      <create-prodgect :technologies="technologies"></create-prodgect>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import CreateProdgect from "~/components/organisms/startups/createProject.vue";

@Component({
  components: {
    CreateProdgect,
  },
})
export default class extends Vue {
  async asyncData({ $strapi }) {
    const technologies = await $strapi.find("technologies");
    return {
      technologies,
    };
  }

  middleware: ["deny-unauthenticated"];
}
</script>
