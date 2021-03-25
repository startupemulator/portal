<template>
  <div class="edit-startup-info">
    <UBack :is-button="true" @clikOnButton="$emit('clikOnButton')"></UBack>
    <UTitle :text="'Edit startup info'"></UTitle>

    <StartupInfo @clickOnButton="$emit('clikOnButton')"></StartupInfo>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import StartupInfo from "~/components/molecules/startupInfo.vue";

// import UPopup from "~/components/molecules/popupChallengeStarted.vue";

@Component({
  components: { UBack, UTitle, StartupInfo },
})
export default class extends Vue {}
</script>
<style lang="scss" scoped>
.edit-startup-info {
  max-width: 660px;
  margin: 0 auto;
  padding: 0 16px;
  margin-top: 40px;
}
@media (min-width: 768px) {
  .edit-startup-info {
    margin-top: 48px;
  }
}
</style>
