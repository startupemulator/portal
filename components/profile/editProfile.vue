<template>
  <div class="edit-profile">
    <u-back :is-button="true" @clikOnButton="$emit('clikOnButton')"></u-back>
    <u-title></u-title>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import uBack from "../theme/uBack.vue";
import UTitle from "../theme/uTitle.vue";
@Component({
  components: {
    uBack,
    UTitle,
  },
})
export default class extends Vue {}
</script>
