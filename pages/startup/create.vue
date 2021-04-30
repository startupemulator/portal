<template>
  <div>
    <div class="createProject">
      <create-prodgect
        :technologies="technologies"
        :estimations="estimations"
        :specialisations="specialisations"
      ></create-prodgect>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import CreateProdject from "~/components/organisms/startups/createProject.vue";

@Component({
  components: {
    CreateProdject,
  },
})
export default class extends Vue {
  async asyncData({ $strapi }) {
    const technologies = await $strapi.find("technologies");
    const estimation = await $strapi.find("estimations");
    const specialisations = await $strapi.find("specialisations");
    let estimations;
    if (estimation !== null) {
      estimations = estimation.sort(function (a, b) {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      });
    }
    return {
      technologies,
      estimations,
      specialisations,
    };
  }

  middleware: ["deny-unauthenticated"];
}
</script>
