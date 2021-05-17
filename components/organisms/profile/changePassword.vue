<template>
  <div class="change-password">
    <u-back :is-button="true" @clikOnButton="$emit('clickOnButton')"></u-back>
    <u-title :text="'Change password'"></u-title>
    <div class="change-password__content">
      <p>Current password</p>
      <UInput
        :placeholder="'Enter your current password'"
        :type="'password'"
        :account-class="
          $v.currentPassword.$error
            ? 'create-account__email error'
            : 'create-account__email'
        "
        @textInput="inputCurrentPassword"
      ></UInput>
      <p v-show="$v.currentPassword.$error" class="errorInput">
        Please enter current password
      </p>
      <p>New password</p>

      <UInput
        :placeholder="'Enter your new password'"
        :type="'password'"
        :account-class="
          $v.password.$error
            ? 'create-account__email error'
            : 'create-account__email'
        "
        @textInput="inputNewPassword"
      ></UInput>
      <p v-show="$v.password.$error" class="errorInput">
        Please enter a password of at least 8 characters
      </p>
      <p>Confirm new password</p>

      <UInput
        :placeholder="'Enter your new password one more time'"
        :type="'password'"
        :account-class="
          $v.confirmPassword.$error
            ? 'create-account__email error'
            : 'create-account__email'
        "
        @textInput="inputConfirmPassword"
      ></UInput>
      <p v-show="$v.confirmPassword.$error" class="errorInput">
        Both passwords should be the same
      </p>
      <div class="change-password__buttons">
        <UButton
          :button-name="'Change'"
          :button-class="'u-button-blue'"
          @clickOnButton="changePassword"
        ></UButton>
        <UButton
          :button-name="'Cancel'"
          :button-class="'u-button-gray'"
          @clickOnButton="$emit('clickOnButton')"
        ></UButton>
      </div>
    </div>
    <popup-challenge-started
      v-if="popupChallengeStarted"
      :title="'You successfully changed your password'"
      :text-content="``"
      @closePopupLinkSent="togglePopupChallengeStarted"
    ></popup-challenge-started>
    <Spiner :loading="loading"></Spiner>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { minLength, required, sameAs } from "vuelidate/lib/validators";
import Toast from "../../../store/modules/Toast";
import uBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UInput from "~/components/atoms/uInput.vue";
import UButton from "~/components/atoms/uButton.vue";
import PopupChallengeStarted from "~/components/molecules/popupChallengeStarted.vue";
import Spiner from "~/components/molecules/spiner.vue";

@Component({
  components: {
    uBack,
    UTitle,
    UInput,
    UButton,
    PopupChallengeStarted,
    Spiner,
  },
  validations: {
    currentPassword: {
      required,
    },
    password: {
      required,
      minLength: minLength(8),
    },
    confirmPassword: {
      sameAsPassword: sameAs("password"),
      minLength: minLength(8),
    },
  },
})
export default class extends Vue {
  @Prop() userId: string;
  popupChallengeStarted = false;
  currentPassword = "";
  password = "";
  confirmPassword = "";
  loading = false;

  async changePassword() {
    this.$v.$touch();
    if (!this.$v.$error) {
      try {
        this.loading = true;
        // before update password need check current password

        const updateUserPassword = await this.$updateUserPassword(
          this.userId,
          "this.password"
        );
        console.log(updateUserPassword);
        if (updateUserPassword !== null) {
          this.togglePopupChallengeStarted();
          this.loading = false;
        } else {
          this.loading = false;
          Toast.show({
            data: "Something wrong.",
            duration: 3000,
          });
        }
      } catch (e) {
        this.loading = false;
        Toast.show({
          data: "Something wrong.",
          duration: 3000,
        });
        console.error(e);
      }
    }
  }

  togglePopupChallengeStarted() {
    this.popupChallengeStarted = !this.popupChallengeStarted;
  }

  inputCurrentPassword(data) {
    this.currentPassword = data;
  }

  inputNewPassword(data) {
    this.password = data;
  }

  inputConfirmPassword(data) {
    this.confirmPassword = data;
  }
}
</script>
<style lang="scss">
.change-password .signing-up-link-sent .signing-up-link-sent__content {
  min-height: 260px;
}
</style>
