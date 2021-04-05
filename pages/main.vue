<template>
  <div class="startup-layout">
    <AppHeader></AppHeader>
    <AppGetExperience></AppGetExperience>
    <AppFooter></AppFooter>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import AppHeader from "~/components/molecules/appHeader.vue";
import AppFooter from "~/components/molecules/appFooter.vue";
import AppGetExperience from "~/components/organisms/landing/appGetExperience.vue";

@Component({
  components: { AppHeader, AppFooter, AppGetExperience },
})
export default class extends Vue {}
</script>
<style lang="scss">
.startup-layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}
</style>
