<template>
  <div class="change-password">
    <u-back :is-button="true" @clikOnButton="$emit('clikOnButton')"></u-back>
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
          :button-name="'Save'"
          :button-class="'u-button-blue'"
        ></u-button>
        <u-button
          :button-name="'Cancel'"
          :button-class="'u-button-gray'"
        ></u-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import uBack from "../atoms/uBack.vue";
import UTitle from "../atoms/uTitle.vue";
import UInput from "../atoms/uInput.vue";
import uButton from "../atoms/uButton.vue";
@Component({
  components: {
    uBack,
    UTitle,
    UInput,
    uButton,
  },
})
export default class extends Vue {}
</script>
