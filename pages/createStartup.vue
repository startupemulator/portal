<template>
  <div>
    <app-header></app-header>
    <div class="createProject">
      <create-prodgect></create-prodgect>
    </div>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppFooter from "~/components/molecules/appFooter.vue";
import appHeader from "~/components/molecules/appHeader.vue";

import CreateProdgect from "~/components/organisms/startups/createProject.vue";
export default {
  components: {
    appHeader,
    AppFooter,
    CreateProdgect,
  },
  // middleware: ["deny-unauthenticated"],
};
</script>
