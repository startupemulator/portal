<template>
  <transition name="fade">
    <SystemAlert
      v-for="message in $store.state.Toast.messages"
      :key="message.id"
      :msg="message.data"
      :timer="message.timer"
    />
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import SystemAlert from "./systemAlert";
import Toast from "~/store/modules/Toast";

@Component({
  components: {
    SystemAlert,
  },
})
export default class extends Vue {
  mounted() {
    Toast.hide();
  }
}
</script>
