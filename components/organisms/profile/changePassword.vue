<template>
  <div class="change-password">
    <u-back :is-button="true" @clikOnButton="$emit('clickOnButton')"></u-back>
    <u-title :text="'Change password'"></u-title>
    <div class="change-password__content">
      <p>Current password</p>
      <u-input :placeholder="'Enter your current password'"></u-input>
      <p>New password</p>
      <u-input :placeholder="'Enter your new password'"></u-input>
      <p>Confirm new password</p>
      <u-input :placeholder="'Enter your new password one more time'"></u-input>
      <div class="change-password__buttons">
        <u-button
          :button-name="'Change'"
          :button-class="'u-button-blue'"
          @clickOnButton="togglePopupChallengeStarted"
        ></u-button>
        <u-button
          :button-name="'Cancel'"
          :button-class="'u-button-gray'"
          @clickOnButton="$emit('clickOnButton')"
        ></u-button>
      </div>
    </div>
    <popup-challenge-started
      v-if="popupChallengeStarted"
      :title="'You successfully changed your password'"
      :text-content="``"
      @closePopupLinkSent="togglePopupChallengeStarted"
    ></popup-challenge-started>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import uBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UInput from "~/components/atoms/uInput.vue";
import uButton from "~/components/atoms/uButton.vue";
import PopupChallengeStarted from "~/components/molecules/popupChallengeStarted.vue";
@Component({
  components: {
    uBack,
    UTitle,
    UInput,
    uButton,
    PopupChallengeStarted,
  },
})
export default class extends Vue {
  popupChallengeStarted = false;

  togglePopupChallengeStarted() {
    this.popupChallengeStarted = !this.popupChallengeStarted;
  }
}
</script>
<style lang="scss">
.change-password .signing-up-link-sent .signing-up-link-sent__content {
  min-height: 260px;
}
</style>
