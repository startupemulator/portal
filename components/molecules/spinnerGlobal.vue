<template>
  <div v-if="loading" class="loader">
    <div class="loader-content">
      <Moon-Loader :color="'#6295FC'"></Moon-Loader>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import MoonLoader from "vue-spinner/src/MoonLoader.vue";
@Component({
  components: { MoonLoader },
})
export default class extends Vue {
  loading = false;
  start() {
    this.loading = true;
  }

  finish() {
    this.loading = false;
  }
}
</script>
