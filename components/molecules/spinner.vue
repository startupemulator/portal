<template>
  <Spinner :loading="$store.state.Spinner.visible"></Spinner>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import SpinnerModule from "../../store/modules/Spinner";
import Spinner from "../atoms/spinner.vue";

@Component({
  components: { Spinner },
})
export default class extends Vue {
  mounted() {
    SpinnerModule.hide();
  }
}
</script>
