<template>
  <div>
    <div class="createProject">
      <CreateProdgect
        :technologies="technologies"
        :estimations="estimations"
        :specialisations="specialisations"
      ></CreateProdgect>
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
  middleware: ["deny-unauthenticated"],
})
export default class extends Vue {
  async asyncData({ $technologies, $estimations, $specialisations }) {
    const { technologies } = await $technologies();
    const { estimations } = await $estimations();
    const { specialisations } = await $specialisations();

    return {
      technologies,
      estimations,
      specialisations,
    };
  }
}
</script>
