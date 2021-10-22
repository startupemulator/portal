<template>
  <div v-if="loading" class="loader">
    <div class="loader-content">
      <MoonLoader :color="'#6295FC'"></MoonLoader>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import MoonLoader from "vue-spinner/src/MoonLoader.vue";
@Component({
  components: { MoonLoader },
})
export default class Spinner extends Vue {
  @Prop() loading: Boolean;
}
</script>
