<template>
  <div class="fullscreen">
    <Spiner :loading="loading"></Spiner>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Toast from "../../../store/modules/Toast";
import Spiner from "~/components/molecules/spiner.vue";

@Component({ Spiner })
export default class extends Vue {
  async asyncData({ route, $passwordConfirmation }) {
    const user = await $passwordConfirmation(route.fullPath.split("?")[1]);
    return {
      user,
    };
  }

  loading = false;

  mounted() {
    if (this.user !== null) {
      this.loading = true;
      setTimeout(() => this.$router.push("/login"), 1000);
    } else {
      Toast.show({
        data: "Something wrong.",
        duration: 3000,
      });
      setTimeout(() => this.$router.push("/createAccount"), 3000);
    }
  }
}
</script>
<style lang="scss">
.fullscreen {
  height: calc(100vh - 306px);
}
</style>
