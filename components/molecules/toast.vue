<template>
  <transition-group name="fade">
    <System-Alert
      v-for="message in $store.state.Toast.messages"
      :key="message.id"
      :msg="message.data"
      :timer="message.timer"
      :success="message.success"
    />
  </transition-group>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import SystemAlert from "./systemAlert.vue";
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
