<template>
  <div>
    <div class="createProject">
      <CreateProdgect
        :technologies="CreateProjectPage.technologies"
        :estimations="CreateProjectPage.estimations"
        :specialisations="CreateProjectPage.specialisations"
      ></CreateProdgect>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import CreateProdgect from "~/components/organisms/startups/createProject.vue";
import { CreateProjectPage } from "~/store";

@Component({
  components: {
    CreateProdgect,
  },
  middleware: ["deny-unauthenticated"],
})
export default class extends Vue {
  CreateProjectPage;
  constructor() {
    super();
    this.CreateProjectPage = CreateProjectPage;
  }

  async asyncData(context) {
    await CreateProjectPage.init(context);
  }
}
</script>
