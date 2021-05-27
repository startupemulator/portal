<template>
  <div>
    <div class="createProject">
      <CreateProdgect
        :technologies="technologies"
        :estimations="estimations"
        :specialisations="specialisations"
        :draft-startup="draftStartup"
      ></CreateProdgect>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import CreateProdgect from "~/components/organisms/startups/createProject.vue";
import { Startup } from "~/models/Startup";
@Component({
  components: {
    CreateProdgect,
  },
  middleware: ["deny-unauthenticated"],
})
export default class extends Vue {
  async asyncData({
    $technologies,
    $estimations,
    $specialisations,
    $startup,
    route,
  }) {
    const { technologies } = await $technologies();
    const { estimations } = await $estimations();
    const { specialisations } = await $specialisations();
    let draftStartup: Array<Startup> = [];
    if (route.params.slug !== undefined) {
      const startup = await $startup(route.params.slug);
      draftStartup = startup;
    }

    return {
      technologies,
      estimations,
      specialisations,
      draftStartup,
    };
  }
}
</script>
